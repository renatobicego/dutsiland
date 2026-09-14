/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Sin esto, Turbopack sale a buscar la raíz del workspace hacia arriba y se topa
    // con un package-lock.json suelto en el home del usuario, fuera del repo.
    root: __dirname,
  },
}

module.exports = nextConfig
