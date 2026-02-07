// api/files.js - SEMPLICE API DI TEST
export default function handler(req, res) {
  // Permetti chiamate da qualsiasi dominio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // Rispondi immediatamente alle richieste OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Gestisci solo richieste GET
  if (req.method === 'GET') {
    const { code } = req.query;
    
    console.log('📞 API chiamata con codice:', code);
    
    // Database di prova
    const fileDatabase = {
      'TEST': { 
        name: 'file_di_prova.txt', 
        size: '1.2 MB',
        url: 'https://filesamples.com/samples/document/txt/sample1.txt',
        message: '✅ API FUNZIONANTE!'
      },
      'ABCD': { 
        name: 'documento_esempio.pdf', 
        size: '2.5 MB',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        message: '✅ File trovato!'
      }
    };
    
    // Cerca il codice
    const file = fileDatabase[code];
    
    if (file) {
      // SUCCESSO: restituisci JSON
      return res.json({
        success: true,
        timestamp: new Date().toISOString(),
        code: code,
        file: file,
        message: file.message,
        server: 'Vercel API attiva'
      });
    } else {
      // CODICE NON TROVATO
      return res.status(404).json({
        success: false,
        error: `Codice "${code}" non trovato`,
        suggestion: 'Usa "TEST" o "ABCD" per testare'
      });
    }
  }

  // METODO NON SUPPORTATO
  return res.status(405).json({
    success: false,
    error: 'Metodo non consentito',
    allowed: ['GET']
  });
}
