"use client";

import { useParams, useRouter } from "next/navigation";

import ServiceForm, {
  ServiceFormData,
} from "@/app/components/services/ServiceForm";
import { services } from "@/app/data/services";



export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const service = services.find(
    (item) => item.id === id
  );

  if (!service) {
    return <div>Service not found</div>;
  }

  // 👇 Write it HERE
  const handleSubmit = (data: ServiceFormData) => {
    console.log(data);

    // Later this will call your API

    router.push("/dashboard/services");
  };

  return (
    <ServiceForm
      initialData={{
        name: service.name,
        category: service.category,
        duration: service.duration,
        description: service.description,
        image: service.image,
        status: service.status,
      }}
      submitLabel="Update Service"
      onSubmit={handleSubmit}
    />
  );
}