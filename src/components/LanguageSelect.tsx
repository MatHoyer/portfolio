import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { availableLanguages, getLanguageIcon } from '@/icons';

type Props = {
  handleSelect: (value: string) => void;
};

export const LanguageSelect: React.FC<Props> = ({ handleSelect }) => {
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          {availableLanguages.map((language) => (
            <SelectItem key={language} value={language}>
              <div className="flex items-center space-x-2">
                {getLanguageIcon(language)}
                <span>{language.capitalize()}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
