'use client'

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface DownloadButtonProps {
  name: string;
}

export function DownloadButton({ name }: DownloadButtonProps) {
  const handleDownload = async () => {
    const resumeElement = document.querySelector('#resume');
    if (!resumeElement) return;

    try {
      // Temporarily modify the element for capture
      const originalStyle = resumeElement.getAttribute('style') || '';
      const originalClass = resumeElement.getAttribute('class') || '';
      
      // Force light theme and ensure full content is visible
      resumeElement.setAttribute('style', `
        ${originalStyle}
        position: absolute;
        top: 0;
        left: 0;
        width: ${resumeElement.scrollWidth}px;
        min-height: ${resumeElement.scrollHeight}px;
        background-color: white !important;
        color: black !important;
      `);
      resumeElement.classList.remove('dark');
      
      // Ensure all elements within use light theme colors
      const elements = resumeElement.getElementsByTagName('*');
      const originalStyles = new Map();
      
      for (const el of elements) {
        originalStyles.set(el, el.getAttribute('style'));
        el.setAttribute('style', `
          ${el.getAttribute('style') || ''}
          color: black !important;
          background-color: transparent !important;
          border-color: #e5e7eb !important;
        `);
      }

      // Generate canvas
      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: resumeElement.scrollWidth,
        windowHeight: resumeElement.scrollHeight,
        onclone: (clonedDoc, element) => {
          element.style.height = `${resumeElement.scrollHeight}px`;
          element.style.width = `${resumeElement.scrollWidth}px`;
        },
      });

      // Restore original styles
      resumeElement.setAttribute('style', originalStyle);
      resumeElement.setAttribute('class', originalClass);
      Array.from(elements).forEach(el => {
        const originalStyle = originalStyles.get(el);
        if (originalStyle) {
          el.setAttribute('style', originalStyle);
        } else {
          el.removeAttribute('style');
        }
      });

      // Create PDF with proper dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      // Handle multiple pages if content is too long
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 1;

      while (heightLeft >= 0) {
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        
        heightLeft -= 297; // A4 height
        position -= 297;
        
        if (heightLeft >= 0) {
          pdf.addPage();
          pageCount++;
        }
      }

      // Generate timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Save the PDF
      pdf.save(`resume_${name.toLowerCase().replace(/\s+/g, '_')}_${timestamp}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="text-muted-foreground hover:text-foreground"
    >
      <Icons.download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
}