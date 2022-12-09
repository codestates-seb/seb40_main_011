import { NotiProps } from '../../types/mainPageTypes';

const NotificationModal = ({ notiClicked, setNotiClicked }: NotiProps) => {
  return notiClicked ? (
    <div
      onClick={() => setNotiClicked(false)}
      className="fixed inset-0 flex items-center justify-center w-full h-screen justify-content"
    >
      <div className="absolute top-[5rem] right-4 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 mr-4 dark:bg-DMSubColor ">
        <div className="py-2">
          <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2 dark:hover:bg-DMThrColor dark:border-white/20">
            <img
              className="h-10 w-10 rounded-full object-cover mx-1"
              src={require('../../images/og-image.png')}
            />
            <p className="text-gray-600 text-sm mx-2 dark:text-white">
              <span className="font-bold">CodeTech광민님이 </span>
              <span className="font-bold text-blue-500">
                댓글을 남기셨습니다
              </span>
              ... 2m ago
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default NotificationModal;
