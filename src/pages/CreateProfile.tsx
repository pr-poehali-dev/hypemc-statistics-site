import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const availableAvatars = [
  "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
  "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
  "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg",
  "/img/29300b11-d0b6-47fe-acc7-bb99b21ebc3a.jpg"
];

const ranks = [
  { value: "BRONZE", label: "BRONZE", color: "from-orange-600 to-orange-800" },
  { value: "SILVER", label: "SILVER", color: "from-gray-300 to-gray-400" },
  { value: "GOLD", label: "GOLD", color: "from-yellow-300 to-yellow-500" },
  { value: "DIAMOND", label: "DIAMOND", color: "from-cyan-400 to-blue-500" },
  { value: "MASTER", label: "MASTER", color: "from-purple-500 to-pink-500" },
  { value: "LEGEND", label: "LEGEND", color: "from-yellow-400 to-orange-500" }
];

const themes = [
  { id: "dark", name: "Темная", preview: "bg-gray-900 text-white" },
  { id: "neon", name: "Неоновая", preview: "bg-black text-green-400" },
  { id: "cyber", name: "Киберпанк", preview: "bg-purple-900 text-cyan-400" },
  { id: "classic", name: "Классическая", preview: "bg-blue-900 text-blue-100" }
];

export default function CreateProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    rank: "BRONZE",
    avatar: availableAvatars[0],
    theme: "dark",
    favoriteMode: "",
    isPublic: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Никнейм обязателен";
    } else if (formData.username.length < 3) {
      newErrors.username = "Никнейм должен содержать минимум 3 символа";
    } else if (formData.username.length > 16) {
      newErrors.username = "Никнейм не может быть длиннее 16 символов";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Никнейм может содержать только буквы, цифры и _";
    }

    if (formData.bio && formData.bio.length > 200) {
      newErrors.bio = "Описание не может быть длиннее 200 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log("Создание профиля:", formData);
    navigate(`/profile/${formData.username}`);
  };

  const getRankColor = (rank: string) => {
    const rankData = ranks.find(r => r.value === rank);
    return rankData ? rankData.color : "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ArrowLeft" size={20} />
              На главную
            </Link>
            <h1 className="text-xl font-bold text-foreground">Создание профиля</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" className="text-primary" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Никнейм *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Введите ваш никнейм"
                    className={errors.username ? "border-destructive" : ""}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank">Начальный ранг</Label>
                  <Select value={formData.rank} onValueChange={(value) => setFormData(prev => ({ ...prev, rank: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ranks.map((rank) => (
                        <SelectItem key={rank.value} value={rank.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${rank.color}`} />
                            {rank.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Расскажите о себе (необязательно)"
                  className={`resize-none ${errors.bio ? "border-destructive" : ""}`}
                  rows={3}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.bio && <span className="text-destructive">{errors.bio}</span>}
                  <span className="ml-auto">{formData.bio.length}/200</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favoriteMode">Любимый режим игры</Label>
                <Select value={formData.favoriteMode} onValueChange={(value) => setFormData(prev => ({ ...prev, favoriteMode: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите режим" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skywars">Skywars</SelectItem>
                    <SelectItem value="bedwars">Bedwars</SelectItem>
                    <SelectItem value="duels">Duels</SelectItem>
                    <SelectItem value="survival">Survival</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Выбор аватара */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Image" className="text-primary" />
                Аватар
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all hover:scale-105 ${
                      formData.avatar === avatar ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <div className="aspect-square">
                      <img 
                        src={avatar} 
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover pixelated"
                      />
                    </div>
                    {formData.avatar === avatar && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <Icon name="Check" size={24} className="text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Тема профиля */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Palette" className="text-primary" />
                Тема профиля
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                    className={`cursor-pointer rounded-lg border-2 transition-all hover:scale-105 ${
                      formData.theme === theme.id ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <div className={`p-4 rounded-lg ${theme.preview}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{theme.name}</span>
                        {formData.theme === theme.id && (
                          <Icon name="Check" size={20} />
                        )}
                      </div>
                      <div className="mt-2 text-sm opacity-75">
                        Пример темы профиля
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Предварительный просмотр */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Eye" className="text-primary" />
                Предварительный просмотр
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20">
                    <img 
                      src={formData.avatar} 
                      alt="Preview"
                      className="w-full h-full object-cover pixelated"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">
                        {formData.username || "Ваш никнейм"}
                      </h3>
                      <Badge className={`bg-gradient-to-r ${getRankColor(formData.rank)} text-black font-bold px-2 py-1`}>
                        {formData.rank}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {formData.bio || "Описание профиля"}
                    </p>
                    {formData.favoriteMode && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Любимый режим: {formData.favoriteMode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кнопки */}
          <div className="flex justify-end gap-4">
            <Link to="/">
              <Button variant="outline">Отмена</Button>
            </Link>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Создать профиль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}