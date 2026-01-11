# Personal Trainer Landing (Ludmila Montes)

Landing page para personal trainer con CTAs a WhatsApp y formulario de contacto que envía emails.

## Demo
- https://ludmila-montes.vercel.app/

## Features
- Secciones: Sobre mí, Planes, Rutinas, Asesorías 1 a 1, Contacto
- Botones con redirección a WhatsApp con mensaje dinámico por plan
- Formulario de contacto con Web3Forms (sin backend)

## Tech
Vite + React + TypeScript + Tailwind + shadcn/ui

## Variables de entorno

Este proyecto utiliza variables de entorno (.env) para claves sensibles.
Estos archivos no están versionados y deben configurarse localmente o en Vercel.

## Run local (frontend only)

From project root:

```bash
npm install
npm run dev:client