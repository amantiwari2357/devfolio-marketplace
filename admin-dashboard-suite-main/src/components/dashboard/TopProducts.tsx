import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "01",
    name: "Home Decor Range",
    popularity: 45,
    sales: "45%",
    color: "bg-chart-blue",
  },
  {
    id: "02",
    name: "Disney Princess Pink Bag 18'",
    popularity: 29,
    sales: "29%",
    color: "bg-chart-green",
  },
  {
    id: "03",
    name: "Bathroom Essentials",
    popularity: 18,
    sales: "18%",
    color: "bg-chart-purple",
  },
  {
    id: "04",
    name: "Apple Smartwatches",
    popularity: 25,
    sales: "25%",
    color: "bg-chart-orange",
  },
];

const TopProducts = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Top Products</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-4">Popularity</div>
          <div className="col-span-2">Sales</div>
        </div>

        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-sm text-muted-foreground">{product.id}</div>
            <div className="col-span-5 text-sm font-medium text-foreground">{product.name}</div>
            <div className="col-span-4">
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${product.color}`}
                  style={{ width: `${product.popularity}%` }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Badge variant="secondary" className="text-xs">
                {product.sales}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopProducts;
