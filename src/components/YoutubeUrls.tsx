"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function YouTubeURLForm() {
  const [youtubeURLs, setYoutubeURLs] = useState([""]);
  const [isRERARegistered, setIsRERARegistered] = useState(false);
  const [reraNumbers, setReraNumbers] = useState([""]);

  const handleURLChange = (index: number, value: string) => {
    setYoutubeURLs((prev) => prev.map((url, i) => (i === index ? value : url)));
  };

  const addURLField = () => {
    setYoutubeURLs((prev) => [...prev, ""]);
  };

  const handleRERANumberChange = (index: number, value: string) => {
    setReraNumbers((prev) => prev.map((num, i) => (i === index ? value : num)));
  };

  const addRERANumberField = () => {
    setReraNumbers((prev) => [...prev, ""]);
  };

  return (
    <div className="p-4 px-8 max-w-5xl bg-background text-primary ">
      <div className="">
        <Label className="block text-foreground text-lg font-medium ">YouTube URLs</Label>
        {youtubeURLs.map((url, index) => (
          <Input
            key={index}
            type="text"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => handleURLChange(index, e.target.value)}
            className="mb-2"
          />
        ))}
        <Button onClick={addURLField} className="mt-2 bg-primary text-white hover:bg-primary/80">
          Add another URL
        </Button>
      </div>

      <div className="my-4">
        <Label className="block text-sm font-medium mb-2">Is the project RERA registered?</Label>
        <Switch checked={isRERARegistered} onCheckedChange={setIsRERARegistered} />
      </div>

      {isRERARegistered && (
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">RERA Number(s)</Label>
          {reraNumbers.map((num, index) => (
            <Input
              key={index}
              type="text"
              placeholder="Enter RERA Number"
              value={num}
              onChange={(e) => handleRERANumberChange(index, e.target.value)}
              className="mb-2"
            />
          ))}
          <Button  onClick={addRERANumberField} className="mt-2 bg-primary text-white hover:bg-primary/80">
            Add another RERA number
          </Button>
        </div>
      )}
    </div>
  );
}

export default YouTubeURLForm;
