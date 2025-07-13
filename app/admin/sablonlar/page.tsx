'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import VisualTemplateEditor from '../../../components/VisualTemplateEditor';

interface Template {
  id: number;
  name: string;
  description?: string;
  category: string;
  thumbnail: string;
  width: number;
  height: number;
  isActive: boolean;
  isPremium: boolean;
  price: number;
  createdAt: string;
  _count?: {
    designs: number;
  };
}

const SablonlarPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [showVisualEditor, setShowVisualEditor] = useState(false);

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'fotograf-baskisi', label: 'Fotoğraf Baskısı' },
    { value: 'canvas', label: 'Canvas' },
    { value: 'fotokitap', label: 'Fotokitap' },
    { value: 'bez-baski', label: 'Bez Baskı' },
    { value: 'poster-baski', label: 'Poster Baskı' }
  ];

  // Mock data - Gerçek API'den gelecek
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTemplates: Template[] = [
        {
          id: 1,
          name: 'Klasik Fotoğraf Şablonu',
          description: 'Standart fotoğraf baskısı için basit şablon',
          category: 'fotograf-baskisi',
          thumbnail: '/api/placeholder/300/200',
          width: 1050,
          height: 1500,
          isActive: true,
          isPremium: false,
          price: 0,
          createdAt: '2024-01-15',
          _count: { designs: 25 }
        },
        {
          id: 2,
          name: 'Modern Canvas Tasarım',
          description: 'Çerçeveli canvas için modern şablon',
          category: 'canvas',
          thumbnail: '/api/placeholder/300/200',
          width: 2000,
          height: 3000,
          isActive: true,
          isPremium: true,
          price: 15,
          createdAt: '2024-01-10',
          _count: { designs: 12 }
        },
        {
          id: 3,
          name: 'Fotokitap Kapak',
          description: 'Fotokitap kapağı için özel tasarım',
          category: 'fotokitap',
          thumbnail: '/api/placeholder/300/200',
          width: 2100,
          height: 3000,
          isActive: false,
          isPremium: false,
          price: 0,
          createdAt: '2024-01-08',
          _count: { designs: 5 }
        }
      ];
      setTemplates(mockTemplates);
      setFilteredTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter templates
  useEffect(() => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, selectedCategory]);

  const handleDeleteTemplate = (id: number) => {
    if (confirm('Bu şablonu silmek istediğinizden emin misiniz?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const toggleTemplateStatus = (id: number) => {
    setTemplates(templates.map(t =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const handleSaveTemplate = (templateData: any) => {
    // TODO: API call to save template
    console.log('Saving template:', templateData);
    setShowVisualEditor(false);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setShowVisualEditor(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Şablon Yönetimi</h1>
              <p className="text-gray-600 mt-1">Tasarım editörü şablonlarını yönetin</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Yeni Şablon</span>
              </button>
              <button
                onClick={() => {
                  setEditingTemplate(null);
                  setShowVisualEditor(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Edit size={20} />
                <span>Visual Editor</span>
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Upload size={20} />
                <span>İçe Aktar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Şablon adı veya açıklama ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Filter size={20} />
                <span>Gelişmiş Filtre</span>
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Şablonlar ({filteredTemplates.length})
            </h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <div className="w-6 h-6 grid grid-cols-2 gap-1">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <div className="w-6 h-6 space-y-1">
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {template.isPremium && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        template.isActive 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {template.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{template.width}x{template.height}</span>
                      <span>{template._count?.designs || 0} kullanım</span>
                    </div>
                    
                    {template.isPremium && (
                      <div className="text-sm font-medium text-green-600 mb-3">
                        {template.price}₺
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTemplate(template)}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded text-sm flex items-center justify-center space-x-1"
                      >
                        <Edit size={14} />
                        <span>Düzenle</span>
                      </button>
                      <button
                        onClick={() => toggleTemplateStatus(template.id)}
                        className={`flex-1 py-1 px-2 rounded text-sm ${
                          template.isActive
                            ? 'bg-red-50 hover:bg-red-100 text-red-600'
                            : 'bg-green-50 hover:bg-green-100 text-green-600'
                        }`}
                      >
                        {template.isActive ? 'Pasif' : 'Aktif'}
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-1 px-2 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">Şablon bulunamadı</div>
              <p className="text-gray-500">Arama kriterlerinizi değiştirin veya yeni şablon ekleyin</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTemplates.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {filteredTemplates.length} şablondan 1-{filteredTemplates.length} arası gösteriliyor
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50" disabled>
                  Önceki
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50" disabled>
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal (placeholder) */}
      {(showCreateModal || editingTemplate) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingTemplate ? 'Şablon Düzenle' : 'Yeni Şablon Oluştur'}
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">Şablon editörü henüz hazırlanmakta...</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingTemplate(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  İptal
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Template Editor */}
      {showVisualEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full h-full max-w-7xl max-h-[95vh] overflow-hidden">
            <VisualTemplateEditor
              template={editingTemplate ? { ...editingTemplate, elements: [] } as any : undefined}
              onSave={handleSaveTemplate}
              onCancel={() => setShowVisualEditor(false)}
              categories={categories.filter(c => c.value !== 'all').map(c => c.value)}
              className="h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SablonlarPage; 