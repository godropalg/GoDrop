// api/download/[code].js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code required' });
  }

  try {
    // Qui recupereresti i file dal database usando il codice
    // Per ora simuliamo
    const mockFiles = [
      { name: 'documento.pdf', url: 'https://example.com/file.pdf', size: '2.5 MB' },
      { name: 'foto.jpg', url: 'https://example.com/photo.jpg', size: '4.8 MB' }
    ];

    res.status(200).json({
      success: true,
      code: code,
      files: mockFiles,
      downloadUrl: `https://${req.headers.host}/api/files/${code}.zip`,
      expiresIn: '24 ore'
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}