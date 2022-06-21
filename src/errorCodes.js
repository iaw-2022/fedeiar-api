function invalidType(error){
    return error.code == '22P02' || error.code == 42601;
}

function duplicatedKey(error){
    return error.code == 23505;
}

function missingKey(error){
    return error.code == 23503;
}

module.exports = {
    invalidType,
    duplicatedKey,
    missingKey
}