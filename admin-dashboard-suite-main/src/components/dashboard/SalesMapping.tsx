import { Card } from "@/components/ui/card";

const SalesMapping = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Sales Mapping by Country</h3>
      <div className="relative h-64 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Simplified world map representation */}
          <g>
            {/* North America - Orange */}
            <circle cx="180" cy="120" r="30" fill="hsl(var(--chart-orange))" opacity="0.8" />
            
            {/* South America - Pink/Red */}
            <circle cx="250" cy="260" r="25" fill="hsl(var(--chart-pink))" opacity="0.8" />
            
            {/* Europe - Blue */}
            <circle cx="400" cy="100" r="20" fill="hsl(var(--chart-blue))" opacity="0.8" />
            
            {/* Africa - Grey */}
            <circle cx="420" cy="220" r="35" fill="hsl(var(--muted))" opacity="0.6" />
            
            {/* Asia - Purple */}
            <circle cx="600" cy="140" r="40" fill="hsl(var(--chart-purple))" opacity="0.8" />
            
            {/* Australia - Green/Cyan */}
            <circle cx="680" cy="280" r="20" fill="hsl(var(--chart-cyan))" opacity="0.8" />
            
            {/* Background continents in light gray */}
            <path
              d="M150,100 Q200,80 250,100 L280,150 Q260,180 230,200 L180,180 Q140,150 150,100 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
            <path
              d="M230,220 Q260,240 250,280 L220,300 Q200,280 210,260 L230,220 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
            <path
              d="M360,80 Q420,70 480,90 L500,120 Q480,140 440,150 L380,130 Q350,110 360,80 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
            <path
              d="M380,180 Q440,160 480,180 L500,240 Q460,260 420,250 L380,220 Q370,200 380,180 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
            <path
              d="M520,100 Q600,80 680,110 L720,160 Q700,200 650,210 L580,190 Q530,160 520,100 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
            <path
              d="M650,260 Q700,250 720,280 L710,310 Q680,320 660,300 L650,260 Z"
              fill="hsl(var(--muted))"
              opacity="0.2"
            />
          </g>
        </svg>
      </div>
    </Card>
  );
};

export default SalesMapping;
