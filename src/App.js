import React, { useState, useEffect } from 'react';
import { Send, Heart, User, Calendar, Trash2, Edit2, X, Check } from 'lucide-react';

// ⚠️ BURAYA KENDİ APPWRITE BİLGİLERİNİZİ GİRİN ⚠️
const APPWRITE_ENDPOINT = 'http://SUNUCU-IP/v1'; // Örnek: http://192.168.1.100/v1
const APPWRITE_PROJECT_ID = 'PROJE-ID-BURAYA';
const DATABASE_ID = 'DATABASE-ID-BURAYA';
const COLLECTION_ID = 'COLLECTION-ID-BURAYA';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

  // Appwrite Client oluştur
  const createClient = () => {
    return {
      endpoint: APPWRITE_ENDPOINT,
      projectId: APPWRITE_PROJECT_ID,
      headers: {
        'X-Appwrite-Project': APPWRITE_PROJECT_ID,
        'Content-Type': 'application/json'
      }
    };
  };

  // Gönderileri yükle
  const loadPosts = async () => {
    setLoading(true);
    try {
      const client = createClient();
      const response = await fetch(
        `${client.endpoint}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`,
        {
          method: 'GET',
          headers: client.headers
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.documents.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ));
      }
    } catch (error) {
      console.error('Gönderiler yüklenirken hata:', error);
      alert('Gönderiler yüklenirken bir hata oluştu. Lütfen Appwrite ayarlarınızı kontrol edin.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Yeni gönderi ekle
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    setLoading(true);
    try {
      const client = createClient();
      const newPost = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        authorId: userId,
        createdAt: new Date().toISOString(),
        likes: 0
      };

      const response = await fetch(
        `${client.endpoint}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`,
        {
          method: 'POST',
          headers: client.headers,
          body: JSON.stringify(newPost)
        }
      );

      if (response.ok) {
        setTitle('');
        setContent('');
        await loadPosts();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.message || 'Gönderi eklenemedi'}`);
      }
    } catch (error) {
      console.error('Gönderi eklenirken hata:', error);
      alert('Gönderi eklenirken bir hata oluştu.');
    }
    setLoading(false);
  };

  // Gönderiyi sil
  const handleDelete = async (postId, authorId) => {
    if (authorId !== userId) {
      alert('Sadece kendi gönderilerinizi silebilirsiniz!');
      return;
    }

    if (!window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) return;

    try {
      const client = createClient();
      const response = await fetch(
        `${client.endpoint}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${postId}`,
        {
          method: 'DELETE',
          headers: client.headers
        }
      );

      if (response.ok || response.status === 204) {
        await loadPosts();
      }
    } catch (error) {
      console.error('Gönderi silinirken hata:', error);
    }
  };

  // Gönderiyi güncelle
  const handleUpdate = async (postId) => {
    if (!editingPost.title.trim() || !editingPost.content.trim()) {
      alert('Başlık ve içerik boş olamaz!');
      return;
    }

    try {
      const client = createClient();
      const response = await fetch(
        `${client.endpoint}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${postId}`,
        {
          method: 'PATCH',
          headers: client.headers,
          body: JSON.stringify({
            title: editingPost.title,
            content: editingPost.content
          })
        }
      );

      if (response.ok) {
        setEditingPost(null);
        await loadPosts();
      }
    } catch (error) {
      console.error('Gönderi güncellenirken hata:', error);
    }
  };

  // Beğeni ekle
  const handleLike = async (post) => {
    try {
      const client = createClient();
      await fetch(
        `${client.endpoint}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${post.$id}`,
        {
          method: 'PATCH',
          headers: client.headers,
          body: JSON.stringify({
            likes: (post.likes || 0) + 1
          })
        }
      );
      await loadPosts();
    } catch (error) {
      console.error('Beğeni eklenirken hata:', error);
    }
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      callback();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Modern Blog
          </h1>
          <p className="text-gray-600">Düşüncelerinizi paylaşın, hikayelerinizi anlatın</p>
        </div>

        {/* Yeni Gönderi Formu */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Yeni Gönderi Oluştur</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Adınız"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
            <textarea
              placeholder="İçeriğinizi buraya yazın... (Ctrl+Enter ile gönder)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, handleSubmit)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={20} />
              {loading ? 'Gönderiliyor...' : 'Paylaş'}
            </button>
          </div>
        </div>

        {/* Gönderiler */}
        <div className="space-y-6">
          {loading && posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Yükleniyor...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-600 text-lg">Henüz gönderi yok. İlk gönderiyi siz oluşturun! 🚀</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition">
                {editingPost && editingPost.$id === post.$id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(post.$id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <Check size={18} />
                        Kaydet
                      </button>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        <X size={18} />
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{post.author}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} />
                            {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      {post.authorId === userId && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(post.$id, post.authorId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                    <button
                      onClick={() => handleLike(post)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition"
                    >
                      <Heart size={18} fill={post.likes > 0 ? 'currentColor' : 'none'} />
                      <span className="font-semibold">{post.likes || 0} Beğeni</span>
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
