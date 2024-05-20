import * as gamefuntion from './Scripts/gamefuntion.js'
import { add_event_listener, update_display_muti, update_display } from './Scripts/unity.js'
import { Player } from './Scripts/game class and values/game class.js'
const foe = gamefuntion.generate_enemy(5)

const weapon = gamefuntion.generate_weapon()

const Player_test = new Player


add_event_listener("generate_item", "click", () => {
  const weapon = gamefuntion.generate_weapon()
  Player_test.addInventory(weapon)
  console.log(Player_test)
  let game_stats_ids = {
    id_list: [
      "player_display_health",
      "player_display_defense",
      "player_display_damage",
      "player_display_crit_chance",
      "player_display_crit_damage",
      "player_display_attack_speed",
      "player_display_status_chance",
      "player_display_element",
    ],
    value_list: [
      `Health: ${Player_test.stats.Health}`,
      `Defense: ${Player_test.stats.Defense}`,
      `Damage: ${Player_test.stats.Damage}`,
      `Crit Chance: ${Player_test.stats.Crit_Chance}`,
      `Crit Damage: ${Player_test.stats.Crit_Damage}`,
      `Attack Speed: ${Player_test.stats.AttackSpeed}`,
      `Status Chance: ${Player_test.stats.Status_chance}`,
      `Element: ${Player_test.stats.Element}`
    ]
  }
  update_display_muti(game_stats_ids.id_list, game_stats_ids.value_list)
  console.log(gamefuntion.fighting(Player_test, foe))
  console.log(Player_test)
  console.log(weapon)
 
  
})





