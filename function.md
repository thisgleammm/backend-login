# Function Documentation

Dokumentasi fungsi-fungsi API yang tersedia di codebase ini.

## Items API

### `GET /api/items`
List semua items dengan fitur search dan filter lokasi.

**Query Parameters:**
- `search` - Cari berdasarkan nama, deskripsi, atau qrCode
- `location` - Filter berdasarkan lokasi penyimpanan

**File:** `app/api/items/route.ts`

---

### `POST /api/items`
Buat item baru dengan QR Code.

**Required Fields:**
- `qrCode` - Kode unik untuk QR Code
- `name` - Nama barang
- `storageLocation` - Lokasi penyimpanan

**Optional Fields:**
- `description` - Deskripsi barang
- `quantity` - Jumlah (default: 1)
- `imageUrl` - URL gambar

**File:** `app/api/items/route.ts`

---

### `GET /api/items/:id`
Get detail item berdasarkan ID.

**File:** `app/api/items/[id]/route.ts`

---

### `PUT /api/items/:id`
Update item (termasuk pindah lokasi).

**Body:** Semua field dari Item (opsional)

**File:** `app/api/items/[id]/route.ts`

---

### `DELETE /api/items/:id`
Hapus item.

**File:** `app/api/items/[id]/route.ts`

---

### `GET /api/items/scan/:code`
**Endpoint utama untuk scan QR Code.**

Cari item berdasarkan kode QR. Mengembalikan info lengkap item beserta lokasi penyimpanan.

**Response:**
```json
{
  "found": true/false,
  "item": { ... },
  "message": "Item ditemukan di Gudang A, Rak 1"
}
```

**File:** `app/api/items/scan/[code]/route.ts`

---

## Users API

### `GET /api/users`
List semua users.

### `GET /api/users/:id`
Get detail user berdasarkan ID.

### `PUT /api/users/:id`
Update user.

### `DELETE /api/users/:id`
Hapus user.

**File:** `app/api/users/route.ts`, `app/api/users/[id]/route.ts`

---

## Auth API

### `POST /api/auth/register`
Registrasi user baru.

### `POST /api/auth/login`
Login user.

**File:** `app/api/auth/register/route.ts`, `app/api/auth/login/route.ts`

---

## Parking Areas API

### `GET /api/parking-areas`
List semua area parkir.

### `GET /api/parking-areas/:id`
Get detail area parkir.

### `POST /api/parking-areas`
Buat area parkir baru.

### `PUT /api/parking-areas/:id`
Update area parkir.

### `DELETE /api/parking-areas/:id`
Hapus area parkir.

**File:** `app/api/parking-areas/route.ts`, `app/api/parking-areas/[id]/route.ts`
