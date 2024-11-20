import { forwardRef, useState, useMemo } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";
interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setlocationSearchInput] = useState("");
    const [hasFocus,setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];
      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name} ${city.subcountry} ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              word.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
          <Input
            placeholder="Select a city"
            type="search"
            value={locationSearchInput}
            onChange={(e) => setlocationSearchInput(e.target.value)}
            onFocus={()=>setHasFocus(true)}
            onBlurCapture={()=>setHasFocus(false)}
            {...props}
            ref={ref}
          />
          <div>
            {locationSearchInput.trim() && hasFocus &&  <div className="absolute bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y">
                {!cities.length && <p className="p-3">No results found</p>}
                {cities.map(city=>(<button onMouseDown={(e)=>{
                    e.preventDefault();
                    onLocationSelected(city);
                    setlocationSearchInput("");
                }} className="block w-full text-start p-2" key={city}>{city}</button>))}
                </div>}
          </div>
      </div>
    );
  },
);
