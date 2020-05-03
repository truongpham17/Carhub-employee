import React from 'react';
import RemoveIcon from './RemoveIcon';
import Edit from './Edit';
import ArrowReturn from './ArrowReturn';
import X from './X';
import AddImage from './AddImage';
import Remove from './Remove';
import EditIcon from './EditIcon';
import Calendar from './Calendar';
import DownArrow from './DownArrow';
import Error from './Error';
import RightArrow from './RightArrow';
import Filter from './Filter';
import ScanIcon from './ScanIcon';
import ErrorCheck from './ErrorCheck';
import SuccessStick from './SuccessStick';
import NextIcon from './NextIcon';

export {
  RemoveIcon,
  Edit,
  ArrowReturn,
  X,
  Remove,
  AddImage,
  EditIcon,
  Calendar,
  DownArrow,
  Error,
  RightArrow,
  Filter,
  ErrorCheck,
  SuccessStick,
};

export function getSvg(svg) {
  switch (svg) {
    case 'filter':
      return <Filter />;
    case 'scan':
      return <ScanIcon />;
    case 'next':
      return <NextIcon />;
    default:
      return null;
  }
}
