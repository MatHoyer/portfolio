import * as React from 'react';
import { icons } from '@/icons';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    tab: string[];
    handleSelect: (value: string) => void;
};

const capitalizeFirstLetter = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
};

export const LanguageSelect: React.FC<Props> = ({ tab, handleSelect }) => {
    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select params" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem key="all" value="all">
                        All
                    </SelectItem>
                    {tab.map((key) => (
                        <SelectItem key={key} value={key}>
                            <div className="flex items-center space-x-2">
                                {icons[key]}
                                <span>{capitalizeFirstLetter(key)}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
