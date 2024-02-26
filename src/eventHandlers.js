
function handleSpawn(bot) {
    console.log(`${bot.username} ready for action.`);

    //setTimeout(() => bot.chat("/c home"), 500);
    bot.chat('/warp hgfhtryrty');
}


function handleDeath(bot) {
    //ot.chat('/warp hgfhtryrty');
    //bot.chat('/warp hgfhtryrty');
    setTimeout(() => bot.chat(`/warp hgfhtryrty`), 50);
}

function handleLogin(bot) {
    bot.chat('/reg GarBot123');
    bot.chat('/surv1');
    console.log(`${bot.username} connected to server.`);
}

function handleEnd(bot) {
    console.log(`${bot.username} disconnected from server.`);
}

module.exports = { handleSpawn, handleDeath, handleLogin, handleEnd };