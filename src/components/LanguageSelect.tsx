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
import { capitalize } from '@/lib/utils';
import { getIcons } from '@/icons';

type Props = {
  tab: string[];
  handleSelect: (value: string) => void;
};

export const LanguageSelect: React.FC<Props> = ({ tab, handleSelect }) => {
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
          {tab.map((key) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center space-x-2">
                {getIcons(key, 25)}
                <span>{capitalize(key)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
