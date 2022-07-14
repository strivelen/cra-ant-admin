import axios from 'util/axios';
import { downloadStreamDataFile } from 'util/utils';

interface getStreamFileProps {
  api: string;
  params: object;
}

export default function Export({
  option,
  actionCom
}: ActionProps<getStreamFileProps>) {
  const onExportFile = async () => {
    const { filename, blob }: { filename: string; blob: Blob } =
      await axios.post(option.api, option.params, {
        responseType: 'blob'
      });
    downloadStreamDataFile(blob, decodeURIComponent(filename));
  };
  return actionCom ? actionCom({ onAction: onExportFile }) : null;
}
