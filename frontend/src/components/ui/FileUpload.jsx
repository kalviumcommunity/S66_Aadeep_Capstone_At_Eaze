import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const FileUpload = ({
  multiple = false,
  accept = "image/*",
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  value = [],
  onChange,
  onError,
  className,
  disabled = false,
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const errors = [];

    // Check file type
    if (accept && !file.type.match(accept.replace("*", ".*"))) {
      errors.push(`${file.name} is not a valid file type`);
    }

    // Check file size
    if (maxSize && file.size > maxSize) {
      errors.push(
        `${file.name} is too large (max ${Math.round(maxSize / 1024 / 1024)}MB)`
      );
    }

    return errors;
  };

  const processFiles = useCallback(
    (files) => {
      const fileArray = Array.from(files);
      const newErrors = [];
      const validFiles = [];

      // Check max files limit
      if (multiple && value.length + fileArray.length > maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
        setErrors(newErrors);
        if (onError) onError(newErrors);
        return;
      }

      fileArray.forEach((file) => {
        const fileErrors = validateFile(file);
        if (fileErrors.length > 0) {
          newErrors.push(...fileErrors);
        } else {
          validFiles.push(file);
        }
      });

      if (newErrors.length > 0) {
        setErrors(newErrors);
        if (onError) onError(newErrors);
      }

      if (validFiles.length > 0) {
        const newValue = multiple ? [...value, ...validFiles] : validFiles;
        onChange(newValue);
        setErrors([]);
      }
    },
    [multiple, value, maxFiles, maxSize, accept, onChange, onError]
  );

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files) {
        processFiles(files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver
            ? "border-ateaze-terracotta bg-ateaze-terracotta/5"
            : "border-gray-300 hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          {isDragOver
            ? "Drop files here"
            : "Drag and drop files here, or click to select"}
        </p>
        <p className="text-xs text-gray-500 mb-4">
          {accept === "image/*" ? "Images" : "Files"} up to{" "}
          {Math.round(maxSize / 1024 / 1024)}MB each
          {multiple && ` (max ${maxFiles} files)`}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          Select Files
        </Button>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-red-600"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          ))}
        </div>
      )}

      {/* File Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {value.map((file, index) => {
            const preview = getFilePreview(file);
            return (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}

                {/* File Info Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-xs font-medium truncate px-2">
                      {file.name}
                    </p>
                    <p className="text-xs">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
