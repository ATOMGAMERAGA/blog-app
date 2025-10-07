# 🚀 Modern Blog Uygulaması

Modern, responsive ve kullanıcı dostu bir blog uygulaması. Appwrite backend ile çalışır.

![Blog App Screenshot](https://via.placeholder.com/800x400?text=Modern+Blog+App)

## ✨ Özellikler

- 📝 Gönderi oluşturma, düzenleme ve silme
- ❤️ Beğeni sistemi
- 👤 Kullanıcı profilleri
- 📱 Tam responsive tasarım
- 🎨 Modern gradient arayüz
- ⚡ Gerçek zamanlı güncellemeler
- 🔒 Kullanıcı bazlı yetkilendirme

## 🛠️ Teknolojiler

- **Frontend:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend:** Appwrite
- **Database:** Appwrite Database

## 📋 Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Appwrite sunucusu (kurulu ve çalışır durumda)

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/KULLANICI-ADINIZ/blog-app.git
cd blog-app
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

veya

```bash
yarn install
```

### 3. Tailwind CSS Kurulumu

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Appwrite Yapılandırması

`src/App.js` dosyasını açın ve aşağıdaki sabitleri kendi Appwrite bilgilerinizle değiştirin:

```javascript
const APPWRITE_ENDPOINT = 'http://SUNUCU-IP/v1'; // Appwrite sunucu adresi
const APPWRITE_PROJECT_ID = 'PROJE-ID';          // Proje ID
const DATABASE_ID = 'DATABASE-ID';               // Database ID
const COLLECTION_ID = 'COLLECTION-ID';           // Collection ID
```

## ⚙️ Appwrite Kurulumu

### Database Yapısı

**Collection Name:** `posts`

**Attributes:**

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| title | String | 255 | ✅ | - |
| content | String | 10000 | ✅ | - |
| author | String | 100 | ✅ | - |
| authorId | String | 100 | ✅ | - |
| createdAt | DateTime | - | ✅ | - |
| likes | Integer | - | ❌ | 0 |

### Permissions

```
Read: Role: Any
Create: Role: Any
Update: Role: Any
Delete: Role: Any
```

> **Güvenlik Notu:** Production ortamında "Any" yerine "Users" kullanın!

## 🎮 Kullanım

### Geliştirme Modunda Çalıştırma

```bash
npm start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

### Production Build

```bash
npm run build
```

Build dosyaları `build/` klasöründe oluşturulacaktır.

## 📁 Proje Yapısı

```
blog-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Ana uygulama komponenti
│   ├── index.js        # Giriş noktası
│   └── index.css       # Global stiller
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Özelleştirme

### Renkleri Değiştirme

`src/App.js` dosyasında Tailwind sınıflarını değiştirin:

```javascript
// Ana gradient rengi
from-purple-600 to-pink-600

// Avatar rengi
from-purple-500 to-pink-500

// Arka plan rengi
from-purple-50 via-pink-50 to-blue-50
```

### Yeni Özellikler Ekleme

1. **Kategori Sistemi:** Appwrite'da yeni attribute ekleyin
2. **Arama Fonksiyonu:** Filter ve search implementasyonu
3. **Yorumlar:** Yeni collection oluşturun

## 🔧 Sorun Giderme

### CORS Hatası

Appwrite'da platform hostname'inizi doğru ayarladığınızdan emin olun:
```
Settings → Platforms → Web App
Hostname: localhost (veya domain adınız)
```

### Gönderiler Yüklenmiyor

1. Appwrite endpoint'i doğru mu kontrol edin
2. Collection permissions'ları kontrol edin
3. Tarayıcı Console'da hata mesajlarını inceleyin (F12)

### Tailwind Çalışmıyor

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 📝 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👤 Yazar

**Adınız**
- GitHub: [@kullanici-adiniz](https://github.com/kullanici-adiniz)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## ⭐ Destek

Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

## 📞 İletişim

Sorularınız için issue açabilir veya bana ulaşabilirsiniz.

---

Made with ❤️ and React
