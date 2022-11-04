
function getErrorObjectFromOra(oraError){
    let message = oraError.message.split(/ORA-\d{5}:\s/)[1];
    return JSON.parse(message);
}

module.exports = getErrorObjectFromOra;