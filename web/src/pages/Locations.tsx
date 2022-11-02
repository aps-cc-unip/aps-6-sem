import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import DashboardLayout from '@/layout/DashboardLayout'
import 'leaflet/dist/leaflet.css'
import { formatDate } from '@/utils/date'

const incidents = [
  {
    description: 'Sonegação de imposto de renda',
    date: new Date(),
    position: {
      lat: -23.160076193356563,
      long: -47.05739514345998,
    },
  },
  {
    description: 'Uso de agrotóxicos em excesso',
    date: new Date(),
    position: {
      lat: -23.008679231316524,
      long: -46.85826556072969,
    },
  },
  {
    description: 'Registros de xenofobia',
    date: new Date(),
    position: {
      lat: -23.152113147435475,
      long: -47.056259022500505,
    },
  },
  {
    description: 'Abuso de autoridade (LGPD)',
    date: new Date(),
    position: {
      lat: -23.301872061332467,
      long: -46.743842998774355,
    },
  },
  {
    description: 'Sonegação em importação de consoles',
    date: new Date(),
    position: {
      lat: -23.12982645131587,
      long: -47.05416000220182,
    },
  },
]

export default function Locations() {
  return (
    <DashboardLayout title="Test">
      <h1 className="mb-2 text-4xl font-bold tracking-tighter">Propriedades</h1>
      <p className="mb-8">
        Veja as propriedades que utilizam agrotóxicos proibidos
      </p>
      <MapContainer
        center={{
          lat: incidents[0].position.lat,
          lng: incidents[0].position.long,
        }}
        zoom={10}
        scrollWheelZoom={true}
        className="h-[48rem] w-full rounded shadow-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.map((incidents, index) => (
          <Marker
            key={index}
            position={{
              lat: incidents.position.lat,
              lng: incidents.position.long,
            }}
          >
            <Popup>
              {incidents.description} <br />
              Ocorrido em: {formatDate(incidents.date)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </DashboardLayout>
  )
}
