import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  bio: string;
  joinDate: string;
  playtime: number;
  achievements: Achievement[];
  recentGames: GameRecord[];
  stats: DetailedStats;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
}

interface GameRecord {
  id: string;
  mode: string;
  result: 'win' | 'loss';
  kills: number;
  deaths: number;
  score: number;
  duration: number;
  date: string;
}

interface DetailedStats {
  totalPlaytime: number;
  gamesWon: number;
  gamesLost: number;
  bestKillStreak: number;
  averageKills: number;
  averageDeaths: number;
  favoriteMode: string;
  winStreak: number;
}

const mockPlayer: Player = {
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
  score: 15420,
  bio: "Профессиональный игрок HypeMC. Специализируюсь на PvP и командных режимах. Играю с 2020 года.",
  joinDate: "2020-03-15",
  playtime: 1450,
  achievements: [
    { id: "1", name: "Первая кровь", description: "Совершите первое убийство", icon: "Sword", rarity: "common", unlockedAt: "2020-03-16" },
    { id: "2", name: "Убийца", description: "1000 убийств", icon: "Target", rarity: "rare", unlockedAt: "2021-01-10" },
    { id: "3", name: "Легенда", description: "Достигните ранга LEGEND", icon: "Crown", rarity: "legendary", unlockedAt: "2023-06-20" },
    { id: "4", name: "Неостановимый", description: "Серия из 20 убийств", icon: "Zap", rarity: "epic", unlockedAt: "2023-02-14" }
  ],
  recentGames: [
    { id: "1", mode: "Skywars", result: "win", kills: 12, deaths: 2, score: 850, duration: 15, date: "2024-01-15" },
    { id: "2", mode: "Bedwars", result: "win", kills: 8, deaths: 3, score: 720, duration: 25, date: "2024-01-15" },
    { id: "3", mode: "Duels", result: "loss", kills: 5, deaths: 6, score: 420, duration: 12, date: "2024-01-14" },
    { id: "4", mode: "Skywars", result: "win", kills: 15, deaths: 1, score: 920, duration: 18, date: "2024-01-14" }
  ],
  stats: {
    totalPlaytime: 1450,
    gamesWon: 432,
    gamesLost: 246,
    bestKillStreak: 23,
    averageKills: 12.5,
    averageDeaths: 3.4,
    favoriteMode: "Skywars",
    winStreak: 5
  }
};

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

const getAchievementColor = (rarity: string) => {
  switch (rarity) {
    case "legendary": return "from-yellow-400 to-orange-500";
    case "epic": return "from-purple-500 to-pink-500";
    case "rare": return "from-blue-400 to-cyan-500";
    default: return "from-gray-400 to-gray-500";
  }
};

export default function Profile() {
  const { username } = useParams();
  const player = mockPlayer;

  if (!player) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Игрок не найден</h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const kdr = (player.kills / Math.max(player.deaths, 1)).toFixed(2);
  const winRate = ((player.wins / Math.max(player.games, 1)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ArrowLeft" size={20} />
              К списку игроков
            </Link>
            <Link to="/profile/edit">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Редактировать профиль
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-primary/20">
                  <img 
                    src={player.avatar} 
                    alt={player.username}
                    className="w-full h-full object-cover pixelated"
                  />
                </div>
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-background ${
                  player.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{player.username}</h1>
                  <Badge className={`${getRankColor(player.rank)} text-black font-bold px-3 py-1`}>
                    {player.rank}
                  </Badge>
                  {player.isOnline && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      ОНЛАЙН
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{player.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Уровень</div>
                    <div className="text-2xl font-bold text-primary">{player.level}</div>
                    <Progress value={(player.level % 10) * 10} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Рейтинг</div>
                    <div className="text-2xl font-bold text-foreground">{player.score.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">K/D Ratio</div>
                    <div className="text-2xl font-bold text-foreground">{kdr}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Процент побед</div>
                    <div className="text-2xl font-bold text-foreground">{winRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">Статистика</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
            <TabsTrigger value="recent">Последние игры</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Swords" className="text-destructive" />
                    Боевая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Убийства:</span>
                    <span className="font-bold">{player.kills.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Смерти:</span>
                    <span className="font-bold">{player.deaths.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Лучшая серия:</span>
                    <span className="font-bold text-primary">{player.stats.bestKillStreak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ср. убийств за игру:</span>
                    <span className="font-bold">{player.stats.averageKills}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-yellow-500" />
                    Игровая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Побед:</span>
                    <span className="font-bold text-green-500">{player.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Поражений:</span>
                    <span className="font-bold text-red-500">{player.stats.gamesLost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Всего игр:</span>
                    <span className="font-bold">{player.games}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Серия побед:</span>
                    <span className="font-bold text-primary">{player.stats.winStreak}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-blue-500" />
                    Время в игре
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Общее время:</span>
                    <span className="font-bold">{player.playtime}ч</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Любимый режим:</span>
                    <span className="font-bold text-primary">{player.stats.favoriteMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Играет с:</span>
                    <span className="font-bold">{new Date(player.joinDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {player.achievements.map((achievement) => (
                <Card key={achievement.id} className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getAchievementColor(achievement.rarity)} opacity-10`} />
                  <CardContent className="p-4 relative">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getAchievementColor(achievement.rarity)} flex items-center justify-center`}>
                        <Icon name={achievement.icon as any} size={24} className="text-white" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-foreground">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className={`bg-gradient-to-r ${getAchievementColor(achievement.rarity)} text-white text-xs`}>
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-4">
              {player.recentGames.map((game) => (
                <Card key={game.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={game.result === 'win' ? 'default' : 'destructive'}>
                          {game.result === 'win' ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}
                        </Badge>
                        <div>
                          <div className="font-bold text-foreground">{game.mode}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(game.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-muted-foreground">K/D</div>
                          <div className="font-bold">{game.kills}/{game.deaths}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Очки</div>
                          <div className="font-bold text-primary">{game.score}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Время</div>
                          <div className="font-bold">{game.duration}м</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Никнейм</label>
                    <div className="font-bold text-foreground">{player.username}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Ранг</label>
                    <div className="font-bold text-foreground">{player.rank}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Дата регистрации</label>
                    <div className="font-bold text-foreground">
                      {new Date(player.joinDate).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Статус</label>
                    <div className="font-bold text-foreground">
                      {player.isOnline ? 'В сети' : 'Не в сети'}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">О себе</label>
                  <div className="font-medium text-foreground mt-1">{player.bio}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}