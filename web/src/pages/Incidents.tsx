import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Navigate } from 'react-router-dom'

import { useBox } from '@/lib/blackbox'
import { authBox } from '@/stores/auth'
import { Role } from '@/domain/entities'
import { requiresLevel } from '@/domain/auth'

import { formatDate } from '@/utils/date'

import DashboardLayout from '@/layout/DashboardLayout'
import 'leaflet/dist/leaflet.css'
import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '@/services/api/incidents'

export default function Incidents() {
  const auth = useBox(authBox)
  const user = auth.user!
  const { data: incidents } = useQuery(['incidents'], getIncidents, {
    initialData: [],
  })

  if (!requiresLevel(Role.MINISTER, user.role)) {
    return <Navigate to="/app/home" />
  }

  return (
    <DashboardLayout title="Test">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Propriedades</h1>
      <p className="mb-8">
        Veja as propriedades que utilizam agrotóxicos proibidos
      </p>
      <MapContainer
        center={{
          lat: -23.16007619335656,
          lng: -47.05739514345998,
        }}
        zoom={10}
        scrollWheelZoom={true}
        className="h-[48rem] w-full rounded shadow-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={{
              lat: incident.latitude,
              lng: incident.longitude,
            }}
          >
            <Popup>
              {incident.title} <br />
              Ocorrido em: {formatDate(incident.createdAt)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </DashboardLayout>
  )
}
