import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  // console.log(first);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ height: '80vh', overflow: 'auto' }}>
      <Document file={url} onLoadSuccess={onLoadSuccess}>
        {Array.from(new Array(numPages), (el, i) => (
          <Page key={i} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
};
