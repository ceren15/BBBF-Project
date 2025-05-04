'use client';

import React, { useState } from 'react';

export default function FormComponent() {
  const [selectedForm, setSelectedForm] = useState<'yazStaji' | 'meslekiEgitim'>('yazStaji');
  const [formData, setFormData] = useState({
    jobName: '',
    jobPhone: '',
    jobWebsite: '',
    jobAddress: '',
    worksOnSaturday: '',
    startDate: '',
    endDate: '',
    totalEmployees: '',
    totalEngineers: '',
    egitimSuresi: '',
    alan: '',
    ogretmenAdi: '',
    firstName: '', // Eklendi
    lastName: '',  // Eklendi
    title: '',     // Eklendi
    degree: '',    // Eklendi
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Hata varsa temizle
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    const phoneRegex = /^0\d{10}$/;
    const websiteRegex = /^https?:\/\/[\w.-]+\.[a-z]{2,}.*$/i;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const totalEmployees = Number(formData.totalEmployees);
    const totalEngineers = Number(formData.totalEngineers);

  
    if (formData.jobName.trim().length < 2) {
      errors.jobName = 'İşyeri adı en az 2 karakter olmalıdır.';
    }
  
    if (!phoneRegex.test(formData.jobPhone)) {
      errors.jobPhone = 'Geçerli bir telefon numarası girin. (Örn: 05XXXXXXXXX)';
    }
  
    if (formData.jobWebsite && !websiteRegex.test(formData.jobWebsite)) {
      errors.jobWebsite = 'Geçerli bir web adresi girin. (https:// ile başlamalı)';
    }
  
    if (!formData.jobAddress.trim()) {
      errors.jobAddress = 'İşyeri adresi boş bırakılamaz.';
    }
  
    if (!formData.worksOnSaturday) {
      errors.worksOnSaturday = 'Cumartesi çalışma durumu seçilmeli.';
    }
  
    if (!formData.startDate || !formData.endDate || start > end) {
      errors.startDate = 'Geçerli tarih aralığı giriniz.';
      errors.endDate = 'Geçerli tarih aralığı giriniz.';
    }
  
    if (!formData.totalEmployees || totalEmployees < 0) {
      errors.totalEmployees = 'Toplam çalışan sayısı sıfırdan küçük olamaz.';
    }
    
    if (!formData.totalEngineers || totalEngineers < 0) {
      errors.totalEngineers = 'Toplam mühendis sayısı sıfırdan küçük olamaz.';
    }
  
    // Sadece mesleki eğitim formu için geçerli olan kontroller
    if (selectedForm === 'meslekiEgitim') {
      if (!formData.firstName.trim()) {
        errors.firstName = 'Mühendisin adı girilmeli.';
      }
      if (!formData.lastName.trim()) {
        errors.lastName = 'Mühendisin soyadı girilmeli.';
      }
      if (!formData.title.trim()) {
        errors.title = 'Mühendisin unvanı girilmeli.';
      }
      if (!formData.degree.trim()) {
        errors.degree = 'Mühendisin diploması girilmeli.';
      }
    }
  
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form başarıyla gönderildi:', formData);
      alert('Form başarıyla gönderildi!');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex flex-col items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold py-5">Yaz Stajı / İşletmede Mesleki Eğitim</h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setSelectedForm('yazStaji')}
            className={`px-4 py-2 text-xl rounded-md text-white ${selectedForm === 'yazStaji' ? 'bg-black' : 'bg-gray-400'}`}
          >
            Yaz Stajı
          </button>
          <button
            type="button"
            onClick={() => setSelectedForm('meslekiEgitim')}
            className={`px-4 py-2 text-xl rounded-md text-white ${selectedForm === 'meslekiEgitim' ? 'bg-black' : 'bg-gray-400'}`}
          >
            Mesleki Eğitim
          </button>
        </div>
      </div>

      <form className="space-y-4 py-4" onSubmit={handleSubmit}>
        {selectedForm === 'yazStaji' && (
          <>
            {/* İşyeri Adı ve Telefonu */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Adı</label>
                <input
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.jobName && <p className="text-sm text-red-500">{formErrors.jobName}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Telefon</label>
                <input
                  name="jobPhone"
                  value={formData.jobPhone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.jobPhone && <p className="text-sm text-red-500">{formErrors.jobPhone}</p>}
              </div>
            </div>

            {/* Web Sitesi */}
            <div>
              <label className="block mb-1 text-sm font-bold text-red-600">Web Adresi (opsiyonel)</label>
              <input
                name="jobWebsite"
                value={formData.jobWebsite}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {formErrors.jobWebsite && <p className="text-sm text-red-500">{formErrors.jobWebsite}</p>}
            </div>

            {/* Adres */}
            <div>
              <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Adres</label>
              <textarea
                name="jobAddress"
                value={formData.jobAddress}
                onChange={handleChange}
                rows={4}
                className="w-full border p-2 rounded resize-none"
              ></textarea>
              {formErrors.jobAddress && <p className="text-sm text-red-500">{formErrors.jobAddress}</p>}
            </div>

            {/* Cumartesi Çalışıyor mu */}
            <div>
              <span className="block mb-1 font-bold text-red-600">Şirket Cumartesi günleri çalışıyor mu?</span>
              <label className="mr-4">
                <input
                  type="radio"
                  name="worksOnSaturday"
                  value="evet"
                  checked={formData.worksOnSaturday === 'evet'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Evet
              </label>
              <label>
                <input
                  type="radio"
                  name="worksOnSaturday"
                  value="hayir"
                  checked={formData.worksOnSaturday === 'hayir'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Hayır
              </label>
              {formErrors.worksOnSaturday && <p className="text-sm text-red-500">{formErrors.worksOnSaturday}</p>}
            </div>

            {/* Tarihler */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Başlangıç Tarihi</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.startDate && <p className="text-sm text-red-500">{formErrors.startDate}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Bitiş Tarihi</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.endDate && <p className="text-sm text-red-500">{formErrors.endDate}</p>}
              </div>
            </div>

            {/* Sayılar */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Toplam Çalışan</label>
                <input
                  type="number"
                  name="totalEmployees"
                  value={formData.totalEmployees}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.totalEmployees && <p className="text-sm text-red-500">{formErrors.totalEmployees}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Toplam Mühendis</label>
                <input
                  type="number"
                  name="totalEngineers"
                  value={formData.totalEngineers}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.totalEngineers && <p className="text-sm text-red-500">{formErrors.totalEngineers}</p>}
              </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="mt-4 px-4 py-2.5 bg-black text-white rounded-md">
                  Gönder
                </button>
            </div>
          </>
        )}


        {/* Mesleki Eğitim */}
        {selectedForm === 'meslekiEgitim' && (
          <>
            
            {/* İşyeri Adı ve Telefonu */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Adı</label>
                <input
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.jobName && <p className="text-sm text-red-500">{formErrors.jobName}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Telefon</label>
                <input
                  name="jobPhone"
                  value={formData.jobPhone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.jobPhone && <p className="text-sm text-red-500">{formErrors.jobPhone}</p>}
              </div>
            </div>

            {/* Web Sitesi */}
            <div>
              <label className="block mb-1 text-sm font-bold text-red-600">Web Adresi (opsiyonel)</label>
              <input
                name="jobWebsite"
                value={formData.jobWebsite}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {formErrors.jobWebsite && <p className="text-sm text-red-500">{formErrors.jobWebsite}</p>}
            </div>

            {/* Adres */}
            <div>
              <label className="block mb-1 text-sm font-bold text-red-600">İşyeri Adres</label>
              <textarea
                name="jobAddress"
                value={formData.jobAddress}
                onChange={handleChange}
                rows={4}
                className="w-full border p-2 rounded resize-none"
              ></textarea>
              {formErrors.jobAddress && <p className="text-sm text-red-500">{formErrors.jobAddress}</p>}
            </div>

            {/* Cumartesi Çalışıyor mu */}
            <div>
              <span className="block mb-1 font-bold text-red-600">Şirket Cumartesi günleri çalışıyor mu?</span>
              <label className="mr-4">
                <input
                  type="radio"
                  name="worksOnSaturday"
                  value="evet"
                  checked={formData.worksOnSaturday === 'evet'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Evet
              </label>
              <label>
                <input
                  type="radio"
                  name="worksOnSaturday"
                  value="hayir"
                  checked={formData.worksOnSaturday === 'hayir'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Hayır
              </label>
              {formErrors.worksOnSaturday && <p className="text-sm text-red-500">{formErrors.worksOnSaturday}</p>}
            </div>

            {/* Tarihler */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Başlangıç Tarihi</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.startDate && <p className="text-sm text-red-500">{formErrors.startDate}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Bitiş Tarihi</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.endDate && <p className="text-sm text-red-500">{formErrors.endDate}</p>}
              </div>
            </div>

            {/* Sayılar */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Toplam Çalışan</label>
                <input
                  type="number"
                  name="totalEmployees"
                  value={formData.totalEmployees}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.totalEmployees && <p className="text-sm text-red-500">{formErrors.totalEmployees}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-bold text-red-600">Toplam Mühendis</label>
                <input
                  type="number"
                  name="totalEngineers"
                  value={formData.totalEngineers}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.totalEngineers && <p className="text-sm text-red-500">{formErrors.totalEngineers}</p>}
              </div>
            </div>

            {/* İşyerindeki Mühendisin Bilgileri*/}
            <div className='font-bold text-red-600 underline '>
                <h1>İşverenin Bilgileri : </h1>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">Mühendisin Adı</label>
                <input
                  name="firstName" // Değeri "firstName" olarak değiştirdim
                  value={formData.firstName} // formData'da firstName olarak saklanacak
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.firstName && <p className="text-sm text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">Mühendisin Soyadı</label>
                <input
                  name="lastName" // Değeri "lastName" olarak değiştirdim
                  value={formData.lastName} // formData'da lastName olarak saklanacak
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.lastName && <p className="text-sm text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            
            {/* İşyerindeki Mühendisin Unvanı ve Diploması */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">Unvanı</label>
                <input
                  name="title" // Değeri "title" olarak değiştirdim
                  value={formData.title} // formData'da title olarak saklanacak
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-bold text-red-600">Diploma</label>
                <input
                  name="degree" // Değeri "degree" olarak değiştirdim
                  value={formData.degree} // formData'da degree olarak saklanacak
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.degree && <p className="text-sm text-red-500">{formErrors.degree}</p>}
              </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="mt-4 px-4 py-2.5 bg-black text-white rounded-md">
                  Gönder
                </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
