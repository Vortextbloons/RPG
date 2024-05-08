import * as gamefuntion from './Scripts/gamefuntion.js'
  const foe = gamefuntion.generate_enemy(5)
  
  console.log(foe)
  const weapon = gamefuntion.generate_weapon()
  console.log(weapon)
  
  const player_test = gamefuntion.player_stats(weapon)
  console.log(player_test)
  console.log(gamefuntion.fighting(player_test, foe))
  
