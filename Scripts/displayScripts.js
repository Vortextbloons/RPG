export function updateBattleLog(message) {
    const battleLog = document.getElementById('battle_log');
    const newLogEntry = document.createElement('p');
    newLogEntry.textContent = message;
    battleLog.appendChild(newLogEntry);
}
