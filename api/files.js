export default function handler(req, res) {
  // Permetti chiamate da browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { code } = req.query;
    
    // Database per test
    const files = {
      'TEST': { 
        name: 'file_test.txt', 
        size: '1 MB',
        url: 'https://filesamples.com/samples/document/txt/sample1.txt'
      },
      'ABCD': { 
        name: 'documento.pdf', 
        size: '2.5 MB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    };
    
    const file = files[code];
    
    if (file) {
      return res.json({
        success: true,
        message: 'API FUNZIONANTE!',
        code: code,
        file: file
      });
    } else {
      return res.json({
        success: false,
        error: `Codice "${code}" non valido. Usa "TEST" o "ABCD"`
      });
    }
  }

  return res.status(405).json({ error: 'Usa GET' });
}
