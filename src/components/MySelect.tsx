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

export const MySelect: React.FC<Props> = ({ tab, handleSelect }) => {
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
                            {icons[key]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
