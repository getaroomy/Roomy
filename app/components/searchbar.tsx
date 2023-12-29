import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {useState, useEffect} from "react";
import Spinner from "@/public/spinner.svg";
import Image from "next/image";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

export default function Searchbar({chooseLocation, placeholder}:
  {
    chooseLocation: (city: string) => void,
    placeholder: string
  }
) {
    const {
      placePredictions,
      getPlacePredictions,
      isPlacePredictionsLoading
    } = useGoogle({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      options: {
        types: ["(cities)"]
      }
    });
    const [inputValue, setInputValue] = useState("");
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const [showAutocompleteResults, setShowAutocompleteResults] = useState(true);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleBlur = (event: any) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setShowAutocompleteResults(false);
      }
    }

    const handleCitySelection = (city: string) => {
      setShowAutocompleteResults(false);
      chooseLocation(city);
    }

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedInputValue(inputValue);
        getPlacePredictions({input: inputValue});
      }, 500);
      return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);
    
  
    return (
      <div className="w-min" onBlur={handleBlur} onFocus={()=>setShowAutocompleteResults(true)} tabIndex={100}>
        <div className="bg-[#FAFAFF] border-2 py-2 flex">
          <input
            id="searchbar-input"
            value={inputValue}
            onChange={handleInputChange}
            className="bg-[#FAFAFF] ml-1"
            placeholder={placeholder}
          />
          {isPlacePredictionsLoading ?
            <Image src={Spinner} alt="Loading results" height={48} width={48} />
          : <MagnifyingGlassCircleIcon width={32} height={32} />}
        </div>
        { showAutocompleteResults &&
        <div className="absolute z-[99] bg-white">
          {placePredictions.map((place, index: number)=>{return (
              <div className="p-2 border-b-2 hover:bg-slate-200" key={index}>
                <h1 onClick={()=>handleCitySelection(place.description)} className="font-medium">📍{place.description}</h1>
              </div>
            )})}
        </div>}
      </div>
    );
  };