"use client"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  FileImage,
  FileText,
  FileSpreadsheet,
  Minimize2,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  File,
  ImageIcon,
} from "lucide-react"
import { saveAs } from "file-saver"
import JSZip from "jszip"

type ToolType =
  | "pdf-to-image"
  | "pdf-to-word"
  | "pdf-to-excel"
  | "compress-pdf"
  | "images-to-pdf"

interface UploadedFile {
  file: File
  name: string
  size: string
}

interface ProcessResult {
  success: boolean
  message: string
  fileName?: string
  blob?: Blob
}

const MAX_FILE_SIZE = 50 * 1024 * 1024

const tools: { id: ToolType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "pdf-to-image",
    label: "PDF sang Ảnh",
    icon: <FileImage className="h-5 w-5" />,
    description: "Chuyển đổi mỗi trang PDF thành file ảnh PNG",
  },
  {
    id: "pdf-to-word",
    label: "PDF sang DOC",
    icon: <FileText className="h-5 w-5" />,
    description: "Trích xuất chữ từ PDF thành file Word (.doc)",
  },
  {
    id: "pdf-to-excel",
    label: "PDF sang CSV",
    icon: <FileSpreadsheet className="h-5 w-5" />,
    description: "Trích xuất dữ liệu từ PDF thành file CSV",
  },
  {
    id: "compress-pdf",
    label: "Nén PDF",
    icon: <Minimize2 className="h-5 w-5" />,
    description: "Giảm dung lượng file PDF",
  },
  {
    id: "images-to-pdf",
    label: "Ảnh sang PDF",
    icon: <ImageIcon className="h-5 w-5" />,
    description: "Ghép nhiều ảnh JPG/PNG thành một file PDF",
  },
]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
}

function isImageFile(file: File) {
  return (
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png"
  )
}

export function PDFTools() {
  const [activeTool, setActiveTool] = useState<ToolType>("pdf-to-image")
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessResult | null>(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetResult = () => {
    setResult(null)
    setProgress(0)
  }

  const setSelectedFiles = useCallback(
    (files: File[]) => {
      if (activeTool === "images-to-pdf") {
        const imageFiles = files.filter(isImageFile)

        if (imageFiles.length === 0) {
          setResult({
            success: false,
            message: "Vui lòng chọn ảnh JPG hoặc PNG",
          })
          return
        }

        const totalSize = imageFiles.reduce((total, file) => total + file.size, 0)
        if (totalSize > MAX_FILE_SIZE) {
          setResult({
            success: false,
            message: "Tổng dung lượng ảnh không được vượt quá 50MB",
          })
          return
        }

        setUploadedFiles(imageFiles)
        setUploadedFile({
          file: imageFiles[0],
          name: `${imageFiles.length} ảnh đã chọn`,
          size: formatFileSize(totalSize),
        })
        resetResult()
        return
      }

      const file = files[0]

      if (!file) return

      if (!isPdfFile(file)) {
        setResult({
          success: false,
          message: "Vui lòng chọn file PDF",
        })
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setResult({
          success: false,
          message: "File PDF không được vượt quá 50MB",
        })
        return
      }

      setUploadedFile({
        file,
        name: file.name,
        size: formatFileSize(file.size),
      })
      setUploadedFiles([])
      resetResult()
    },
    [activeTool]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedFiles(Array.from(e.target.files || []))
    },
    [setSelectedFiles]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setSelectedFiles(Array.from(e.dataTransfer.files || []))
    },
    [setSelectedFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const clearFile = useCallback(() => {
    setUploadedFile(null)
    setUploadedFiles([])
    resetResult()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const convertPdfToImages = async (file: File): Promise<ProcessResult> => {
    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise

      const zip = new JSZip()
      const imgFolder = zip.folder("images")

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(Math.round((i / pdf.numPages) * 90))

        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        if (!context) throw new Error("Không thể tạo canvas")

        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: context,
          viewport,
        }).promise

        const imgData = canvas.toDataURL("image/png").split(",")[1]
        imgFolder?.file(`page-${i}.png`, imgData, { base64: true })
      }

      setProgress(95)
      const blob = await zip.generateAsync({ type: "blob" })
      setProgress(100)

      return {
        success: true,
        message: `Đã chuyển đổi ${pdf.numPages} trang thành ảnh PNG`,
        blob,
        fileName: file.name.replace(/\.pdf$/i, "-images.zip"),
      }
    } catch (error) {
      console.error("PDF to Image error:", error)
      return {
        success: false,
        message: "Lỗi khi chuyển đổi PDF sang ảnh. Vui lòng thử lại.",
      }
    }
  }

  const convertImagesToPdf = async (files: File[]): Promise<ProcessResult> => {
    try {
      const { PDFDocument } = await import("pdf-lib")
      const pdfDoc = await PDFDocument.create()

      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round((i / files.length) * 90))

        const file = files[i]
        const imageBytes = await file.arrayBuffer()

        const image =
          file.type === "image/png"
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes)

        const { width, height } = image.scale(1)
        const page = pdfDoc.addPage([width, height])

        page.drawImage(image, {
          x: 0,
          y: 0,
          width,
          height,
        })
      }

      setProgress(95)
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      setProgress(100)

      return {
        success: true,
        message: `Đã ghép ${files.length} ảnh thành PDF`,
        blob,
        fileName: "images-to-pdf.pdf",
      }
    } catch (error) {
      console.error("Images to PDF error:", error)
      return {
        success: false,
        message: "Lỗi khi ghép ảnh thành PDF. Chỉ hỗ trợ JPG, JPEG, PNG.",
      }
    }
  }

  const compressPdf = async (file: File): Promise<ProcessResult> => {
    try {
      const { PDFDocument } = await import("pdf-lib")

      setProgress(20)
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      setProgress(50)
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })

      const originalSize = file.size
      const compressedSize = compressedPdfBytes.length
      const reduction = Math.round((1 - compressedSize / originalSize) * 100)

      setProgress(100)

      return {
        success: true,
        message: `Đã nén PDF: ${formatFileSize(originalSize)} → ${formatFileSize(
          compressedSize
        )} (giảm ${Math.max(0, reduction)}%)`,
        blob: new Blob([compressedPdfBytes], { type: "application/pdf" }),
        fileName: file.name.replace(/\.pdf$/i, "-compressed.pdf"),
      }
    } catch (error) {
      console.error("Compress PDF error:", error)
      return {
        success: false,
        message: "Lỗi khi nén PDF. Vui lòng thử lại.",
      }
    }
  }

  const convertPdfToWord = async (file: File): Promise<ProcessResult> => {
    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

      setProgress(20)
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise

      let fullText = ""

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(20 + Math.round((i / pdf.numPages) * 60))
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: unknown) => (item as { str: string }).str)
          .join(" ")

        fullText += `--- Trang ${i} ---\n\n${pageText}\n\n`
      }

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name}</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    ${fullText
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("")}
  </div>
</body>
</html>`

      setProgress(100)

      return {
        success: true,
        message: `Đã trích xuất nội dung từ ${pdf.numPages} trang PDF`,
        blob: new Blob([htmlContent], { type: "application/msword" }),
        fileName: file.name.replace(/\.pdf$/i, ".doc"),
      }
    } catch (error) {
      console.error("PDF to Word error:", error)
      return {
        success: false,
        message: "Lỗi khi chuyển đổi PDF sang Word. Vui lòng thử lại.",
      }
    }
  }

  const convertPdfToExcel = async (file: File): Promise<ProcessResult> => {
    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

      setProgress(20)
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise

      const rows: string[][] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(20 + Math.round((i / pdf.numPages) * 60))
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        const itemsByY: Map<number, string[]> = new Map()

        for (const item of textContent.items) {
          const textItem = item as { str: string; transform: number[] }
          const y = Math.round(textItem.transform[5])

          if (!itemsByY.has(y)) {
            itemsByY.set(y, [])
          }

          itemsByY.get(y)!.push(textItem.str)
        }

        const sortedYs = Array.from(itemsByY.keys()).sort((a, b) => b - a)

        rows.push([`Trang ${i}`])
        for (const y of sortedYs) {
          const rowTexts = itemsByY.get(y)!
          if (rowTexts.some((t) => t.trim())) {
            rows.push(rowTexts)
          }
        }
        rows.push([])
      }

      const csvContent = rows
        .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
        .join("\n")

      setProgress(100)

      return {
        success: true,
        message: `Đã trích xuất dữ liệu từ ${pdf.numPages} trang PDF thành CSV`,
        blob: new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8" }),
        fileName: file.name.replace(/\.pdf$/i, ".csv"),
      }
    } catch (error) {
      console.error("PDF to Excel error:", error)
      return {
        success: false,
        message: "Lỗi khi chuyển đổi PDF sang Excel. Vui lòng thử lại.",
      }
    }
  }

  const processFile = async () => {
    if (activeTool === "images-to-pdf") {
      if (uploadedFiles.length === 0) return
    } else if (!uploadedFile) {
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setResult(null)

    let processResult: ProcessResult

    switch (activeTool) {
      case "pdf-to-image":
        processResult = await convertPdfToImages(uploadedFile!.file)
        break
      case "pdf-to-word":
        processResult = await convertPdfToWord(uploadedFile!.file)
        break
      case "pdf-to-excel":
        processResult = await convertPdfToExcel(uploadedFile!.file)
        break
      case "compress-pdf":
        processResult = await compressPdf(uploadedFile!.file)
        break
      case "images-to-pdf":
        processResult = await convertImagesToPdf(uploadedFiles)
        break
      default:
        processResult = { success: false, message: "Công cụ không hợp lệ" }
    }

    setResult(processResult)
    setIsProcessing(false)
  }

  const downloadResult = () => {
    if (result?.blob && result.fileName) {
      saveAs(result.blob, result.fileName)
    }
  }

  const currentTool = tools.find((tool) => tool.id === activeTool)!

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chọn công cụ PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => {
                  setActiveTool(tool.id)
                  setUploadedFile(null)
                  setUploadedFiles([])
                  setResult(null)
                  setProgress(0)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                  }
                }}
              >
                {tool.icon}
                <span className="text-xs font-medium">{tool.label}</span>
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            {currentTool.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5" />
            {activeTool === "images-to-pdf" ? "Tải lên ảnh" : "Tải lên file PDF"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <File className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

              <p className="text-muted-foreground mb-2">
                {activeTool === "images-to-pdf"
                  ? "Kéo thả ảnh vào đây hoặc click để chọn"
                  : "Kéo thả file PDF vào đây hoặc click để chọn"}
              </p>

              <p className="text-xs text-muted-foreground">
                {activeTool === "images-to-pdf"
                  ? "Hỗ trợ JPG, JPEG, PNG, tổng tối đa 50MB"
                  : "Hỗ trợ file PDF, tối đa 50MB"}
              </p>

              <Input
                ref={fileInputRef}
                type="file"
                accept={activeTool === "images-to-pdf" ? "image/png,image/jpeg" : ".pdf,application/pdf"}
                multiple={activeTool === "images-to-pdf"}
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <File className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>

                <div>
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{uploadedFile.size}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={clearFile}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFile && (
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={processFile}
            disabled={isProcessing}
            className="min-w-48"
          >
            {isProcessing ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Đang xử lý... {progress}%
              </>
            ) : (
              <>
                {currentTool.icon}
                <span className="ml-2">{currentTool.label}</span>
              </>
            )}
          </Button>
        </div>
      )}

      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Đang xử lý...</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className={result.success ? "border-green-500/50" : "border-destructive/50"}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}

              <div className="flex-1">
                <p
                  className={
                    result.success
                      ? "text-green-700 dark:text-green-400"
                      : "text-destructive"
                  }
                >
                  {result.message}
                </p>

                {result.success && result.blob && (
                  <Button className="mt-4" onClick={downloadResult}>
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống {result.fileName}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Công cụ PDF trực tuyến</CardTitle>
        </CardHeader>

        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Các công cụ PDF miễn phí giúp bạn chuyển đổi và xử lý file PDF ngay trên
            trình duyệt. Tất cả xử lý được thực hiện trên máy của bạn, đảm bảo an toàn
            và bảo mật.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-2">
              <ImageIcon className="h-4 w-4 mt-1 text-blue-500" />
              <div>
                <p className="font-medium text-sm">PDF sang Ảnh</p>
                <p className="text-xs text-muted-foreground">
                  Xuất mỗi trang thành file PNG chất lượng cao
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-1 text-blue-500" />
              <div>
                <p className="font-medium text-sm">PDF sang DOC</p>
                <p className="text-xs text-muted-foreground">
                  Trích xuất nội dung văn bản từ PDF
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileSpreadsheet className="h-4 w-4 mt-1 text-green-500" />
              <div>
                <p className="font-medium text-sm">PDF sang CSV</p>
                <p className="text-xs text-muted-foreground">
                  Xuất dữ liệu bảng sang định dạng CSV
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Minimize2 className="h-4 w-4 mt-1 text-orange-500" />
              <div>
                <p className="font-medium text-sm">Nén PDF</p>
                <p className="text-xs text-muted-foreground">
                  Giảm dung lượng file PDF để chia sẻ dễ dàng
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <ImageIcon className="h-4 w-4 mt-1 text-purple-500" />
              <div>
                <p className="font-medium text-sm">Ảnh sang PDF</p>
                <p className="text-xs text-muted-foreground">
                  Ghép nhiều ảnh JPG/PNG thành một file PDF
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}