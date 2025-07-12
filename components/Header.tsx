'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Package, 
  User, 
  LogIn, 
  UserPlus, 
  Phone, 
  Mail,
  Menu,
  X,
  ChevronDown,
  LogOut
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      name: 'Fotoğraf Baskısı',
      href: '/fotograf-baskisi',
      submenu: [
        { name: 'Fotoğraf Baskısı', href: '/fotograf-baskisi' },
        { name: 'Poster Baskı', href: '/poster-baski' },
        { name: 'Bez Üzerine Baskı', href: '/bez-baski' },
        { name: 'Vesikalık & Biyometrik', href: '/vesikalik' },
        { name: 'Fotoblok', href: '/fotoblok' },
      ]
    },
    {
      name: 'Fotokitap',
      href: '/fotokitap',
      submenu: [
        { name: 'Sert Kapak Fotokitap', href: '/fotokitap' },
        { name: 'Akordiyon Kitap', href: '/akordiyon-kitap' },
        { name: 'Tel Spiralli Kitap', href: '/tel-spiral-kitap' },
        { name: 'Mini Kitap', href: '/mini-kitap' },
        { name: 'Anı Kitabı', href: '/ani-kitabi' },
      ]
    },
    {
      name: 'Canvas Tablo',
      href: '/canvas',
      submenu: [
        { name: 'Tek Parça Canvas', href: '/canvas' },
        { name: 'Çerçeveli Canvas', href: '/cerceveli-canvas' },
        { name: 'Parçalı Canvas', href: '/parcali-canvas' },
        { name: 'Kolaj Canvas', href: '/kolaj-canvas' },
        { name: 'Pola Canvas', href: '/pola-canvas' },
      ]
    },
    { name: 'Foto Takvim', href: '/takvim' },
    {
      name: 'Pola Kart',
      href: '/pola-kart',
      submenu: [
        { name: '9x11 cm Polakart', href: '/pola-9x11' },
        { name: '6x9 cm Polakart', href: '/pola-6x9' },
        { name: '9x9 cm Kare Polakart', href: '/pola-9x9' },
      ]
    },
    {
      name: 'Foto Magnet',
      href: '/foto-magnet',
      submenu: [
        { name: '5x7,5 cm Foto Magnet', href: '/magnet-5x7' },
        { name: '7,5x10 cm Foto Magnet', href: '/magnet-7x10' },
        { name: '10x10 cm Foto Magnet', href: '/magnet-10x10' },
        { name: '10x15 cm Foto Magnet', href: '/magnet-10x15' },
        { name: '15x15 cm Foto Magnet', href: '/magnet-15x15' },
        { name: '15x21 cm Foto Magnet', href: '/magnet-15x21' },
      ]
    },
    {
      name: 'Çerçeveli Fotoğraf',
      href: '/cerceveli-fotograf',
      submenu: [
        { name: 'Ekolojik Çerçeve', href: '/ekolojik-cerceve' },
        { name: 'Çerçeveli Fotoğraf', href: '/cerceveli-fotograf' },
      ]
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <Link href="mailto:info@furkanbxy.com" className="flex items-center space-x-1 hover:text-primary-400 transition-colors">
              <Mail size={14} />
              <span>info@furkanbxy.com</span>
            </Link>
            <Link href="tel:08508850515" className="flex items-center space-x-1 hover:text-primary-400 transition-colors">
              <Phone size={14} />
              <span>+90 0545 673 4497</span>
            </Link>
          </div>
          <button className="bg-secondary-600 hover:bg-secondary-700 px-3 py-1 rounded-full text-xs transition-colors">
            Geri Arama Talebi
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gradient">
            FurkanBxy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button className="flex items-center space-x-1 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    <span>{item.name}</span>
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    <span>{item.name}</span>
                  </Link>
                )}
                {item.submenu && (
                  <div className="dropdown-menu group/dropdown">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="dropdown-item"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/sepet" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart size={20} />
              <span>Sepetim</span>
            </Link>
            {user ? (
              <>
                <Link href="/profil/siparislerim" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <Package size={20} />
                  <span>Siparişlerim</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    <User size={20} />
                    <span>{user.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profilim
                      </Link>
                      <Link href="/profil/siparislerim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Siparişlerim
                      </Link>
                      <Link href="/profil/adreslerim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Adreslerim
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/giris" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <LogIn size={20} />
                  <span>Giriş Yap</span>
                </Link>
                <Link href="/kayit" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <UserPlus size={20} />
                  <span>Kayıt Ol</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="font-medium text-gray-900 mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-primary-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-medium text-gray-900 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile User Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <Link 
                href="/sepet" 
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <span>Sepetim</span>
              </Link>
              {user ? (
                <>
                  <Link 
                    href="/profil/siparislerim" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package size={20} />
                    <span>Siparişlerim</span>
                  </Link>
                  <Link 
                    href="/profil" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>Profilim</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/giris" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Giriş Yap</span>
                  </Link>
                  <Link 
                    href="/kayit" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>Kayıt Ol</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header 