import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Search from "@/components/ui/search";

export default function LearnMoreButton() {
  return (
    <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
      Learn more <span aria-hidden="true">→</span>
    </Link>
  );
}
