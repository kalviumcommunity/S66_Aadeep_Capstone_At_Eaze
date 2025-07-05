import React, { useState } from "react";
import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { uploadMultipleFiles } from "@/lib/api";
import { Upload, Loader2 } from "lucide-react";

const FileUploadDemo = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const result = await uploadMultipleFiles(files, "product");
      setUploadedUrls(result.urls);
      toast({
        title: "Upload successful",
        description: `${result.count} files uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-ateaze-charcoal mb-4">
            File Upload Demo
          </h1>
          <p className="text-muted-foreground">
            Test the file upload functionality with drag and drop support.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileUpload
              multiple={true}
              accept="image/*"
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
              value={files}
              onChange={setFiles}
              onError={(errors) => {
                toast({
                  title: "Upload Error",
                  description: errors.join(", "),
                  variant: "destructive",
                });
              }}
            />

            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="flex items-center gap-2"
              >
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Files"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {uploadedUrls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedUrls.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Uploaded URLs:</h4>
                <div className="space-y-1">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="text-sm font-mono break-all">
                      {url}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FileUploadDemo;
