# kalender-tanam
pembuatan kalender tanam berdasarkah hasil prediksi iklim untuk membantu para petani dalam menentukan waktu bercocok tanam

# Data 
data disimpan di dalam database MongoDB, terdapat dua data yaitu :
- Tanaman
  [
  { "tanaman": "padi", "ilmiah": "Oryza sativa", "chBB": "456", "chBA": "567", "suBB": "25", "suBA": "29", "masaTanam": "4" },
  { "tanaman": "cabai", "ilmiah": "Capsicum frutescens", "chBB": "123", "chBA": "234", "suBB": "23", "suBA": "27", "masaTanam": "4" },
  { "tanaman": "kedelai", "ilmiah": "Glycine max", "chBB": "234", "chBA": "345", "suBB": "24", "suBA": "29", "masaTanam": "4" }, ...
  ]
- Iklim
  [
  { "bulan": "Januari", "curahHujan": "500", "suhuUdara": "26" },
  { "bulan": "Februari", "curahHujan": "500", "suhuUdara": "26" },
  { "bulan": "Maret", "curahHujan": "500", "suhuUdara": "26" }, ...
  ]

