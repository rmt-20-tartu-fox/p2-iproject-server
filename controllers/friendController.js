const R6API = require('r6api.js').default;

let email = 'randrazerayah@gmail.com'
let password = 'akubimo123'
const r6api = new R6API({email,password})
class Controller{
  static async getMyFriend(req, res, next){
    console.log('FRIEND')
    // console.log(req.body)

    let {friend} = req.body
    const username = friend;
    const platform = 'uplay';
  
    const { 0: player } = await r6api.findByUsername(platform, username);
    if (!player) {
      res.status(404).json("Player Not Found")
      return
    };
  
    const { 0: stats } = await r6api.getStats(platform, player.id);
    if (!stats) return 'Stats not found';
    const { pvp: { general } } = stats;
  
    let played = await r6api.getRanks('uplay',player.id);
    let statistic = {
      rank: played[0].seasons["24"].regions.apac.boards.pvp_ranked.current.name,
      mmr: played[0].seasons["24"].regions.apac.boards.pvp_ranked.current.mmr,
      icon: played[0].seasons["24"].regions.apac.boards.pvp_ranked.current.icon,
      KD: general.kd,
      wins: general.wins,
      losses: general.losses,
      winRate:general.winRate

    }
    res.status(200).json({username:player.username, statistic})
  }
}

module.exports = Controller