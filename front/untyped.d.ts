declare module 'react-responsive-masonry' {
  import React from 'react';

  interface MasonryProps {}
  interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [index: number]: number };
  }

  export default class Masonry extends React.Component<MasonryProps> {}
  export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> {}
}
