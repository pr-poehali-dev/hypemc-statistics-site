import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Player {
  id: number;
  username: string;
  level: number;
  kills: number;
  deaths: number;
  wins: number;
  games: number;
  isOnline: boolean;
  avatar: string;
  rank: string;
  score: number;
}

const mockPlayers: Player[] = [
  {
    id: 1,
    username: "ShadowKnight",
    level: 127,
    kills: 8456,
    deaths: 2341,
    wins: 432,
    games: 678,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "LEGEND",
    score: 15420
  },
  {
    id: 2,
    username: "CyberNinja",
    level: 119,
    kills: 7892,
    deaths: 2156,
    wins: 398,
    games: 621,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "MASTER",
    score: 14680
  },
  {
    id: 3,
    username: "PixelWarrior",
    level: 115,
    kills: 7234,
    deaths: 2089,
    wins: 376,
    games: 589,
    isOnline: false,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "MASTER",
    score: 13920
  },
  {
    id: 4,
    username: "EliteGamer",
    level: 112,
    kills: 6987,
    deaths: 1967,
    wins: 354,
    games: 567,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "DIAMOND",
    score: 13450
  },
  {
    id: 5,
    username: "ProBuilder",
    level: 108,
    kills: 6543,
    deaths: 1876,
    wins: 332,
    games: 534,
    isOnline: false,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "DIAMOND",
    score: 12980
  },
  {
    id: 6,
    username: "ThunderStrike",
    level: 105,
    kills: 6234,
    deaths: 1789,
    wins: 318,
    games: 512,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "DIAMOND",
    score: 12560
  },
  {
    id: 7,
    username: "MysticForce",
    level: 102,
    kills: 5987,
    deaths: 1698,
    wins: 295,
    games: 487,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "GOLD",
    score: 12180
  },
  {
    id: 8,
    username: "VoidHunter",
    level: 98,
    kills: 5654,
    deaths: 1634,
    wins: 276,
    games: 463,
    isOnline: false,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "GOLD",
    score: 11720
  },
  {
    id: 9,
    username: "DragonSlayer",
    level: 95,
    kills: 5432,
    deaths: 1567,
    wins: 258,
    games: 442,
    isOnline: true,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "GOLD",
    score: 11340
  },
  {
    id: 10,
    username: "NetherWalker",
    level: 92,
    kills: 5198,
    deaths: 1489,
    wins: 241,
    games: 421,
    isOnline: false,
    avatar: "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
    rank: "SILVER",
    score: 10980
  }
];

const getRankColor = (rank: string) => {
  switch (rank) {
    case "LEGEND": return "bg-gradient-to-r from-yellow-400 to-orange-500";
    case "MASTER": return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "DIAMOND": return "bg-gradient-to-r from-cyan-400 to-blue-500";
    case "GOLD": return "bg-gradient-to-r from-yellow-300 to-yellow-500";
    case "SILVER": return "bg-gradient-to-r from-gray-300 to-gray-400";
    default: return "bg-gradient-to-r from-gray-500 to-gray-600";
  }
};

const PlayerCard = ({ player, position }: { player: Player; position: number }) => {
  const kdr = (player.kills / Math.max(player.deaths, 1)).toFixed(2);
  const winRate = ((player.wins / Math.max(player.games, 1)) * 100).toFixed(1);
  
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-4">
          {/* Позиция */}
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
              position === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
              position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
              position === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
              'bg-muted'
            } text-black`}>
              {position}
            </div>
          </div>

          {/* Аватар и статус */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-border">
              <img 
                src={player.avatar} 
                alt={player.username}
                className="w-full h-full object-cover pixelated"
              />
            </div>
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
              player.isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`} />
          </div>

          {/* Основная информация */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-foreground">{player.username}</h3>
              <Badge className={`${getRankColor(player.rank)} text-black font-bold px-2 py-1`}>
                {player.rank}
              </Badge>
              {player.isOnline && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  ОНЛАЙН
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Уровень</div>
                <div className="text-primary font-bold text-lg">{player.level}</div>
                <Progress value={(player.level % 10) * 10} className="h-1 mt-1" />
              </div>
              <div>
                <div className="text-muted-foreground">K/D</div>
                <div className="text-foreground font-bold">{kdr}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Побед</div>
                <div className="text-foreground font-bold">{winRate}%</div>
              </div>
            </div>
          </div>

          {/* Подробная статистика */}
          <div className="flex-shrink-0 text-right">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-muted-foreground">Убийства:</div>
              <div className="text-foreground font-medium">{player.kills.toLocaleString()}</div>
              
              <div className="text-muted-foreground">Смерти:</div>
              <div className="text-foreground font-medium">{player.deaths.toLocaleString()}</div>
              
              <div className="text-muted-foreground">Побед:</div>
              <div className="text-foreground font-medium">{player.wins}</div>
              
              <div className="text-muted-foreground">Игр:</div>
              <div className="text-foreground font-medium">{player.games}</div>
            </div>
            <div className="mt-3 text-right">
              <div className="text-xs text-muted-foreground">Рейтинг</div>
              <div className="text-xl font-bold text-primary">{player.score.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  const onlineCount = mockPlayers.filter(p => p.isOnline).length;
  const totalGames = mockPlayers.reduce((sum, p) => sum + p.games, 0);
  const totalKills = mockPlayers.reduce((sum, p) => sum + p.kills, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Gamepad2" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HYPEMC STATS
                </h1>
                <p className="text-muted-foreground text-sm">Статистика игроков сервера</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Онлайн: <span className="text-primary font-medium">{onlineCount}/10</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Icon name="Users" size={32} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{onlineCount}</div>
              <div className="text-sm text-muted-foreground">Игроков онлайн</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6 text-center">
              <Icon name="Trophy" size={32} className="text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{totalGames.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Всего игр</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-6 text-center">
              <Icon name="Zap" size={32} className="text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{totalKills.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Всего убийств</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Players */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Icon name="Crown" className="text-primary" />
            Топ-10 игроков
          </h2>
          <p className="text-muted-foreground">Лучшие игроки сервера по общему рейтингу</p>
        </div>

        <div className="space-y-4">
          {mockPlayers.map((player, index) => (
            <PlayerCard key={player.id} player={player} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}