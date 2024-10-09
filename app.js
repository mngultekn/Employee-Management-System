let calisanlar = [];

function calisanEkle(isim, yas, departman, maas) {
  if (!isim || yas < 18 || maas <= 0) {
    console.log("Hata: Geçersiz çalışan bilgileri!");
    return;
  }
  const varMi = calisanlar.some((calisan) => calisan.isim === isim);
  if (varMi) {
    console.log("Hata: Aynı isimde bir çalışan zaten mevcut.");
    return;
  }

  calisanlar.push({ isim, yas, departman, maas });
  console.log(`${isim} adlı çalışan başarıyla eklendi.`);
}

function calisanGuncelle(isim, yeniYas, yeniDepartman, yeniMaas) {
  const calisanIndex = calisanlar.findIndex((calisan) => calisan.isim === isim);

  if (calisanIndex === -1) {
    console.log("Hata: Bu isimde bir çalışan bulunamadı.");
    return;
  }

  calisanlar[calisanIndex].yas = yeniYas;
  calisanlar[calisanIndex].departman = yeniDepartman;
  calisanlar[calisanIndex].maas = yeniMaas;
  console.log(`${isim} adlı çalışanın bilgileri güncellendi.`);
}

function calisanSil(isim) {
  const calisanIndex = calisanlar.findIndex((calisan) => calisan.isim === isim);

  if (calisanIndex === -1) {
    console.log("Hata: Bu isimde bir çalışan bulunamadı.");
    return;
  }

  calisanlar.splice(calisanIndex, 1);
  console.log(`${isim} adlı çalışan silindi.`);
}

function departmanaGoreListele(departman) {
  const departmanCalisanlari = calisanlar.filter(
    (calisan) => calisan.departman === departman
  );

  if (departmanCalisanlari.length === 0) {
    console.log("Bu departmanda çalışan bulunmamaktadır.");
    return;
  }

  console.log(`${departman} departmanındaki çalışanlar:`);
  departmanCalisanlari.forEach((calisan) => {
    console.log(
      `İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Maaş: ${calisan.maas} TL`
    );
  });
}

function maasaGoreListele(artan = true) {
  if (calisanlar.length === 0) {
    console.log("Listelenecek çalışan bulunmamaktadır.");
    return;
  }

  const siraliCalisanlar = [...calisanlar].sort((a, b) => {
    return artan ? a.maas - b.maas : b.maas - a.maas;
  });

  console.log(
    artan ? "Maaşa göre artan sıralama:" : "Maaşa göre azalan sıralama:"
  );
  siraliCalisanlar.forEach((calisan) => {
    console.log(
      `İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Maaş: ${calisan.maas} TL`
    );
  });
}

function maasAltindaListele(limit) {
  const maasAltindakiCalisanlar = calisanlar.filter(
    (calisan) => calisan.maas < limit
  );

  if (maasAltindakiCalisanlar.length === 0) {
    console.log(`Maaşı ${limit} TL altında olan çalışan bulunmamaktadır.`);
    return;
  }

  console.log(`Maaşı ${limit} TL altında olan çalışanlar:`);
  maasAltindakiCalisanlar.forEach((calisan) => {
    console.log(
      `İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Maaş: ${calisan.maas} TL`
    );
  });
}

function enYuksekMaasliCalisan() {
  if (calisanlar.length === 0) {
    console.log("Çalışan bulunmamaktadır.");
    return;
  }

  const enYuksekMaasli = calisanlar.reduce((prev, current) =>
    prev.maas > current.maas ? prev : current
  );
  console.log(
    `En yüksek maaşlı çalışan: ${enYuksekMaasli.isim}, Maaş: ${enYuksekMaasli.maas} TL`
  );
}

function toplamMaas() {
  const toplam = calisanlar.reduce((sum, calisan) => sum + calisan.maas, 0);
  console.log(`Tüm çalışanların toplam maaşı: ${toplam} TL`);
}

function departmanToplamMaas(departman) {
  const departmanCalisanlari = calisanlar.filter(
    (calisan) => calisan.departman === departman
  );
  const toplam = departmanCalisanlari.reduce(
    (sum, calisan) => sum + calisan.maas,
    0
  );

  if (departmanCalisanlari.length === 0) {
    console.log("Bu departmanda çalışan bulunmamaktadır.");
    return;
  }

  console.log(`${departman} departmanının toplam maaş gideri: ${toplam} TL`);
}

calisanEkle("Ali", 30, "Muhasebe", 6000);
calisanEkle("Ayşe", 25, "IT", 7000);
calisanEkle("Ahmet", 35, "Muhasebe", 5000);

calisanGuncelle("Ayşe", 26, "IT", 7500);

calisanSil("Ahmet");

departmanaGoreListele("IT");

maasaGoreListele(true);

maasAltindaListele(6000);

enYuksekMaasliCalisan();

toplamMaas();

departmanToplamMaas("Muhasebe");
