const { format, createLogger, transports } = require('winston');
const { splat, colorize, printf, combine, label, timestamp } = format;

const Log = async (folderName, title) => {

    // Xac dinh option de tao ra doi tuong logger tu ham createLogger, toi tuong nay co
    // cac funtion info, error, truyen vao message cua log
    let option = {
        format: combine(
            splat(),
            // format timestap cho doi tuong log
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            // xay dung them thuoc tinh label cho doi tuong log
            label({
                label: title
            }),
            // format mau cho level
            // colorize(),
            // xac dinh xem log se hien thi nhu the nao
            printf((log) => {
                return `${log.timestamp} | ${log.label} | ${log.level} | ${log.message}`
            })
        ),
        // xac dinh xem loai log nao duoc luu o file nao
        transports: [
            new transports.File({ filename: `./logs/history/${folderName}/error.log`, level: 'error' }),
            new transports.File({ filename: `./logs/history/${folderName}/info.log`, level: 'info' }),
            new transports.File({ filename: `./logs/history/${folderName}/debug.log`, level: 'debug' }),
            new transports.File({ filename: `./logs/history/${folderName}/warn.log`, level: 'debug' }),
            new transports.File({ filename: `./logs/history/${folderName}/verbose.log`, level: 'verbose' }),
            new transports.File({ filename: `./logs/history/${folderName}/silly.log`, level: 'silly' }),

        ]
    }

    return createLogger(option);
}

const LogInfo = async (email, content, portal = undefined) => {
    try {
        if (!portal) {
            portal = process.env.DB_NAME
        }
        let Logger = await Log(portal, content);
        Logger.info(email);
    } catch (error) {
        console.log(error.message)
    }
}

const LogError = async (email, content, portal = undefined) => {
    try {
        if (!portal) {
            portal = process.env.DB_NAME
        }
        let Logger = await Log(portal, content);
        Logger.error(email);
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    LogInfo,
    LogError
}