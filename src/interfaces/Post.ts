export default interface Post {
  // propertie from APOD API
  title: string;
  url: string;
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;

  // custom properties
  liked?: boolean;
}
