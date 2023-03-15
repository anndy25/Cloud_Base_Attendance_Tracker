// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function revalidate(req, res) {

  if (req.method === 'POST') {
    const { id, role } = req.query
    await res.revalidate('/admin/dashboard');
    await res.revalidate(`/admin/${role}/${id}`);
    return res.status(201).json({ revalidated: true })
  }

  return res.status(404).json({ message: "wrong response!" })
}
