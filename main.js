import * as gamefuntion from './Scripts/gamefuntion.js'
import { add_event_listener, update_display_muti, update_display } from './Scripts/unity.js'

const foe = gamefuntion.generate_enemy(5)




add_event_listener("generate_item", "click", () => {
  const weapon = gamefuntion.generate_weapon()
  const player_test = gamefuntion.player_stats(weapon)
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
      `Health: ${player_test.stats.health}`,
      `Defense: ${player_test.stats.defense}`,
      `Damage: ${player_test.stats.damage}`,
      `Crit Chance: ${player_test.stats.Crit_chance}`,
      `Crit Damage: ${player_test.stats.Crit_damage}`,
      `Attack Speed: ${player_test.stats.attack_speed}`,
      `Status Chance: ${player_test.stats.Status_chance}`,
      `Element: ${player_test.stats.element}`
    ]
  }
  update_display_muti(game_stats_ids.id_list, game_stats_ids.value_list)
  console.log(gamefuntion.fighting(player_test, foe))
  console.log(player_test)
  console.log(weapon)
 
  
})





