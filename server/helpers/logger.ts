import { join } from 'path';
const log = require('node-file-logger');

const options = {
    timeZone: 'Europe/London',
    folderPath: join(__dirname, '/../logs/'),  
    dateBasedFileNaming: true,
    // Required only if dateBasedFileNaming is set to false
    fileName: 'All_Logs',
    // Required only if dateBasedFileNaming is set to true
    fileNamePrefix: 'Logs_',
    fileNameSuffix: '',
    fileNameExtension: '.log',     
    
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'debug',
    onlyFileLogging: true
}

log.SetUserOptions(options);

export default log;