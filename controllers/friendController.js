const R6API = require('r6api.js').default;

let email = process.env.EMAIL
let password = process.env.PASSWORD

const r6api = new R6API({email,password})
class Controller{
  static async getMyFriend(req, res, next){
    
    console.log('FRIEND')
    // console.log(req.body)
    let {friend} = req.body
    const username = friend;
    const platform = 'uplay';
    let temp = setTimeout(() => {
      res.status(404).json("Player Not Found")
    }, 10000)

    const { 0: player } = await r6api.findByUsername(platform, username);
    console.log(player.id)
    if (!player) {
      res.status(404).json("Player Not Found")
      return
    };
    
    
    const { 0: stats } = await r6api.getStats(platform, player.id);
    if (!stats) return 'Stats not found';
    const { pvp: { general } } = stats;
    clearTimeout(temp);
  
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

  static async getNews(req, res, next){
    try {
      let news = await r6api.getNews({ limit: 10 });
      let newses = news.items
      res.status(200).json(newses)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = Controller