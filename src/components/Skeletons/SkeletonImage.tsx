import styles from "../PostCard/PostCard.module.css";

const SkeletonImage = ({ height }: { height?: number }) => {
  return (
    <div className={styles.PostImageContainer}>
      <div className={styles.SkeletonImage} style={{ height: height }} />
    </div>
  );
};

export default SkeletonImage;
