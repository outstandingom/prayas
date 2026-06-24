// src/pages/Documents.tsx
import { motion } from 'framer-motion';
import { FileText, FileImage, Download, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DOCUMENTS = [
  {
    id: 1,
    name: 'Form 10AB Approval',
    fileName: 'AABTP3001D_Form 10AB Approval .pdf',
    type: 'pdf',
    path: '/documents/AABTP3001D_Form 10AB Approval .pdf',
  },
  {
    id: 2,
    name: 'CSR-1 Registration Letter',
    fileName: 'CSR-1_Registration letter_AB5600296 (1).pdf',
    type: 'pdf',
    path: '/documents/CSR-1_Registration letter_AB5600296 (1).pdf',
  },
  {
    id: 3,
    name: 'List of Members',
    fileName: 'list of members (1).pdf',
    type: 'pdf',
    path: '/documents/list of members (1).pdf',
  },
  {
    id: 4,
    name: 'Prayas Bylaws',
    fileName: 'prayas bylaws (1).pdf',
    type: 'pdf',
    path: '/documents/prayas bylaws (1).pdf',
  },
  {
    id: 5,
    name: 'Samatipanjayan',
    fileName: 'samatipanjayan.jpeg',
    type: 'image',
    path: '/documents/samatipanjayan.jpeg',
  },
];

export default function Documents() {
  const { t } = useTranslation();

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (type === 'image') return <FileImage className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  // Download the file using fetch to ensure we get the correct binary data
  const handleDownload = async (doc: typeof DOCUMENTS[0]) => {
    try {
      // Encode the URL to handle special characters
      const encodedPath = encodeURI(doc.path);
      const response = await fetch(encodedPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert(t('documents.downloadError', 'Failed to download the file. Please try again later.'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <FileText className="w-8 h-8 text-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {t('documents.title', 'Documents &')}{' '}
            <span className="text-[#FFF314]">{t('documents.titleHighlight', 'Records')}</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2 max-w-2xl mx-auto">
            {t(
              'documents.subtitle',
              'Download official documents, registrations, and important records of Prayas Samaj Sevi Sanstha.'
            )}
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#FFF314]/10 flex flex-col"
            >
              <div className="flex items-center justify-center p-6 bg-[#FFF314]/5 border-b border-[#FFF314]/10">
                {getFileIcon(doc.type)}
                <span className="ml-2 text-xs font-medium text-[#263238]/40 uppercase">
                  {doc.type}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-[#263238] mb-1 line-clamp-2">
                  {t(`documents.list.${doc.id}.name`, doc.name)}
                </h3>
                <p className="text-xs text-[#263238]/40 truncate">{doc.fileName}</p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={encodeURI(doc.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF314]/10 text-[#263238] rounded-lg text-sm font-medium hover:bg-[#FFF314]/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    {t('documents.actions.view', 'View')}
                  </a>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#263238] text-white rounded-lg text-sm font-medium hover:bg-[#263238]/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t('documents.actions.download', 'Download')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
